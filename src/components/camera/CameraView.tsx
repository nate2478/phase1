'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './CameraView.module.css';

interface CameraViewProps {
  selectedColor: string | null;
}

const CameraView: React.FC<CameraViewProps> = ({ selectedColor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (selectedColor) {
      applyLipColor(selectedColor);
    }
  }, [selectedColor]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('카메라 시작 실패:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const applyLipColor = async (color: string) => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return;

    setIsProcessing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    // TODO: 실제 입술 감지 및 색상 적용 로직
    // 여기서는 간단한 예시로 구현
    // 실제로는 face-api.js, MediaPipe, 또는 TensorFlow.js 등을 사용하여 입술 영역 감지 필요

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 비디오 프레임을 캔버스에 그리기
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 입술 영역 감지 및 색상 적용 (임시: 하드코딩된 영역)
    // 실제로는 ML 모델을 사용하여 입술 영역을 감지해야 함
    const lipRegion = {
      x: canvas.width * 0.35,
      y: canvas.height * 0.55,
      width: canvas.width * 0.3,
      height: canvas.height * 0.1,
    };

    // 입술 영역에 색상 적용
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.6;
    ctx.fillRect(lipRegion.x, lipRegion.y, lipRegion.width, lipRegion.height);
    ctx.globalAlpha = 1.0;

    setIsProcessing(false);
  };

  return (
    <div className={styles.cameraView}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className={styles.video}
      />
      {selectedColor && (
        <canvas
          ref={canvasRef}
          className={styles.canvas}
        />
      )}
    </div>
  );
};

export default CameraView;

