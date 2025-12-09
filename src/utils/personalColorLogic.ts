import { SelectionResult, Tone, Season, PersonalColorType, PERSONAL_COLOR_MAP } from '@/types/personalColor';

// 1단계 결과 계산: 쿨톤/웜톤 결정
export const calculateStep1Result = (result: SelectionResult['step1']): Tone | null => {
  const { round1, round2, round3 } = result;
  if (!round1 || !round2 || !round3) return null;

  const counts = { warm: 0, cool: 0 };
  [round1, round2, round3].forEach((tone) => {
    if (tone) counts[tone]++;
  });

  return counts.warm > counts.cool ? 'warm' : 'cool';
};

// 2단계 결과 계산: 계절 결정
export const calculateStep2Result = (result: SelectionResult['step2']): Season | null => {
  const { round1, round2, round3 } = result;
  if (!round1 || !round2 || !round3) return null;

  const counts: Record<Season, number> = { spring: 0, summer: 0, autumn: 0, winter: 0 };
  [round1, round2, round3].forEach((season) => {
    if (season) counts[season]++;
  });

  // 가장 많이 선택된 계절 반환
  let maxCount = 0;
  let maxSeason: Season | null = null;
  Object.entries(counts).forEach(([season, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxSeason = season as Season;
    }
  });

  return maxSeason;
};

// 3단계 결과 계산: 최종 퍼스널컬러 타입 결정
export const calculateFinalType = (
  tone: Tone,
  season: Season,
  selectedColorIndex: number
): PersonalColorType | null => {
  // 3단계에서 선택한 색상 인덱스에 따라 세부 타입 결정
  const typeMap: Record<string, PersonalColorType[]> = {
    'warm_spring': ['spring_warm_light', 'spring_warm_true', 'spring_warm_bright'],
    'warm_autumn': ['autumn_warm_deep', 'autumn_warm_mute', 'autumn_warm_true'],
    'cool_summer': ['summer_cool_mute', 'summer_cool_light', 'summer_cool_true'],
    'cool_winter': ['winter_cool_deep', 'winter_cool_bright', 'winter_cool_true'],
  };

  const key = `${tone}_${season}`;
  const types = typeMap[key];
  if (!types || selectedColorIndex < 0 || selectedColorIndex >= types.length) {
    return null;
  }

  return types[selectedColorIndex];
};

// 전체 결과 계산
export const calculateFinalResult = (selectionResult: SelectionResult): PersonalColorType | null => {
  const tone = calculateStep1Result(selectionResult.step1);
  const season = calculateStep2Result(selectionResult.step2);

  if (!tone || !season || !selectionResult.step3.selectedType) {
    return null;
  }

  return selectionResult.step3.selectedType;
};

