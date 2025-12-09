'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SelectionResult, SelectionStep, SelectionRound, Tone, Season, PersonalColorType } from '@/types/personalColor';
import { calculateStep1Result, calculateStep2Result, calculateFinalType } from '@/utils/personalColorLogic';
import CameraView from './camera/CameraView';
import ColorSelection from './camera/ColorSelection';
import styles from './PercolMatching.module.css';

interface PercolMatchingProps {
  onComplete?: (result: PersonalColorType) => void;
  onCancel?: () => void;
}

const PercolMatching: React.FC<PercolMatchingProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<SelectionStep>(1);
  const [round, setRound] = useState<SelectionRound>(1);
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectionResult, setSelectionResult] = useState<SelectionResult>({
    step1: {},
    step2: {},
    step3: {},
  });
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  // 색상 로드
  useEffect(() => {
    loadColors();
  }, [step, round]);

  const loadColors = async () => {
    try {
      const tone = step === 2 ? calculateStep1Result(selectionResult.step1) : undefined;
      const season = step === 3 ? calculateStep2Result(selectionResult.step2) : undefined;

      const response = await fetch('/api/personal-color/colors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, tone, season }),
      });

      if (response.ok) {
        const data = await response.json();
        setColors(data.colors);
      }
    } catch (error) {
      console.error('색상 로드 실패:', error);
    }
  };

  // 카메라 권한 확인
  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission(true);
    } catch (error) {
      setCameraPermission(false);
      setShowPermissionModal(true);
    }
  };

  const handlePermissionGrant = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      stream.getTracks().forEach((track) => track.stop());
      setCameraPermission(true);
      setShowPermissionModal(false);
    } catch (error) {
      console.error('카메라 권한 획득 실패:', error);
      alert('카메라 권한이 필요합니다.');
    }
  };

  const handleColorSelect = (color: string, colorIndex: number) => {
    setSelectedColor(color);

    // 선택 결과 저장
    if (step === 1) {
      // 1단계: 쿨톤/웜톤 판단 (색상코드로 톤 판단은 백오피스에서 관리)
      // 여기서는 간단히 색상 인덱스로 판단 (실제로는 백오피스에서 색상의 톤 정보 제공 필요)
      const tone: Tone = colorIndex < 2 ? 'warm' : 'cool'; // 임시 로직
      setSelectionResult((prev) => ({
        ...prev,
        step1: {
          ...prev.step1,
          [`round${round}`]: tone,
        },
      }));
    } else if (step === 2) {
      // 2단계: 계절 판단
      const tone = calculateStep1Result(selectionResult.step1);
      if (tone === 'warm') {
        const season: Season = colorIndex < 2 ? 'spring' : 'autumn';
        setSelectionResult((prev) => ({
          ...prev,
          step2: {
            ...prev.step2,
            [`round${round}`]: season,
          },
        }));
      } else {
        const season: Season = colorIndex < 2 ? 'summer' : 'winter';
        setSelectionResult((prev) => ({
          ...prev,
          step2: {
            ...prev.step2,
            [`round${round}`]: season,
          },
        }));
      }
    } else if (step === 3) {
      // 3단계: 세부 타입 결정
      const tone = calculateStep1Result(selectionResult.step1);
      const season = calculateStep2Result(selectionResult.step2);
      if (tone && season) {
        const finalType = calculateFinalType(tone, season, colorIndex);
        if (finalType) {
          setSelectionResult((prev) => ({
            ...prev,
            step3: { selectedType: finalType },
          }));
        }
      }
    }
  };

  const handleNext = () => {
    if (!selectedColor) {
      alert('색상을 선택해주세요.');
      return;
    }

    if (round < 3) {
      setRound((prev) => (prev + 1) as SelectionRound);
      setSelectedColor(null);
    } else {
      // 다음 단계로
      if (step === 1) {
        const finalTone = calculateStep1Result(selectionResult.step1);
        setSelectionResult((prev) => ({
          ...prev,
          step1: { ...prev.step1, finalTone: finalTone || undefined },
        }));
        setStep(2);
        setRound(1);
        setSelectedColor(null);
      } else if (step === 2) {
        const finalSeason = calculateStep2Result(selectionResult.step2);
        setSelectionResult((prev) => ({
          ...prev,
          step2: { ...prev.step2, finalSeason: finalSeason || undefined },
        }));
        setStep(3);
        setRound(1);
        setSelectedColor(null);
      } else if (step === 3) {
        // 완료
        const finalType = selectionResult.step3.selectedType;
        if (finalType && onComplete) {
          onComplete(finalType);
        }
      }
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  if (cameraPermission === null) {
    return <div className={styles.loading}>카메라 권한 확인 중...</div>;
  }

  if (showPermissionModal) {
    return (
      <div className={styles.permissionModal}>
        <div className={styles.modalContent}>
          <h2>카메라 권한 필요</h2>
          <p>퍼컬매칭 기능을 사용하려면 카메라 권한이 필요합니다.</p>
          <div className={styles.modalButtons}>
            <button onClick={handlePermissionGrant} className={styles.primaryButton}>
              허용
            </button>
            <button onClick={handleCancel} className={styles.secondaryButton}>
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cameraPermission) {
    return (
      <div className={styles.error}>
        <p>카메라 권한이 필요합니다.</p>
        <button onClick={checkCameraPermission}>다시 시도</button>
      </div>
    );
  }

  const getStepTitle = () => {
    if (step === 1) return '1단계: 쿨톤/웜톤 선택';
    if (step === 2) return '2단계: 계절 선택';
    return '3단계: 세부 타입 선택';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{getStepTitle()}</h2>
        <p className={styles.roundInfo}>
          {round}차례 / 3차례
        </p>
      </div>

      <div className={styles.cameraContainer}>
        <CameraView selectedColor={selectedColor} />
      </div>

      <div className={styles.selectionArea}>
        <ColorSelection
          colors={colors}
          selectedColor={selectedColor}
          onSelect={handleColorSelect}
        />
      </div>

      <div className={styles.buttons}>
        <button onClick={handleCancel} className={styles.cancelButton}>
          취소
        </button>
        <button
          onClick={handleNext}
          className={styles.nextButton}
          disabled={!selectedColor}
        >
          {step === 3 && round === 3 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default PercolMatching;

