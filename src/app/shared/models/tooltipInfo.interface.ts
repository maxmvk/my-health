export interface TooltipInfoInterface {
  MUSCLE_AGE_GENERIC: TooltipDataInterface;
  RENAL_AGE_GENERIC: TooltipDataInterface;
  OVERALL_AGE_GENERIC: TooltipDataInterface;
  ENDOCRINE_AGE_GENERIC: TooltipDataInterface;
  LIVER_AGE_GENERIC: TooltipDataInterface;

  MUSCLE_AGE_PERSONAL: TooltipDataInterface;
  RENAL_AGE_PERSONAL: TooltipDataInterface;
  OVERALL_AGE_PERSONAL: TooltipDataInterface;
  ENDOCRINE_AGE_PERSONAL: TooltipDataInterface;
  LIVER_AGE_PERSONAL: TooltipDataInterface;
}

export interface TooltipDataInterface {
  ageomeType: string;
  title: string;
  type: string;
  subtitle1: string;
  info1: string[];
  subtitle2: string;
  info2: string[];
}
