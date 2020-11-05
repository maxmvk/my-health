import {TooltipNamesInterface, TooltipInfoInterface} from './models';

export const tooltipNames: TooltipNamesInterface = {
  muscle_age: {
    generic: 'MUSCLE_AGE_GENERIC',
    personal: 'MUSCLE_AGE_PERSONAL'
  },

  renal_age: {
    generic: 'RENAL_AGE_GENERIC',
    personal: 'RENAL_AGE_PERSONAL'
  },

  overall_age: {
    generic: 'OVERALL_AGE_GENERIC',
    personal: 'OVERALL_AGE_PERSONAL'
  },

  endocrine_age: {
    generic: 'ENDOCRINE_AGE_GENERIC',
    personal: 'ENDOCRINE_AGE_PERSONAL'
  },

  liver_age: {
    generic: 'LIVER_AGE_GENERIC',
    personal: 'LIVER_AGE_PERSONAL'
  },
};

export const tooltipInfo: TooltipInfoInterface = {
  MUSCLE_AGE_GENERIC: {
    ageomeType: 'muscle_age',
    title: 'Muscle Age',
    type: 'Generic',
    subtitle1: 'How measured',
    info1: [
      'eGym strength measurement trending',
      'Grip strength test',
      'InBody machine muscle mass'
    ],
    subtitle2: 'How treated',
    info2: [
      'Nutrition consult for protein intake',
      'Strength training',
      'Hormone Replacement Therapy'
    ],
  },

  RENAL_AGE_GENERIC: {
    ageomeType: 'renal_age',
    title: 'Renal/Kidney Age',
    type: 'Generic',
    subtitle1: 'How measured',
    info1: [
      'Labs',
      'Biomarkers',
      'Blood pressure'
    ],
    subtitle2: 'How treated',
    info2: [
      'Nutrition and body mass consult',
      'Blood pressure control',
      'Exosome treatment'
    ],
  },

  OVERALL_AGE_GENERIC: {
    ageomeType: 'overall_age',
    title: 'Overall Biological Age',
    type: 'Generic',
    subtitle1: 'How measured',
    info1: [
      'White Blood Cell Count, A1C, hsCRP, Lipid Panels',
      'Biomarkers',
      'Sleep tracking'
    ],
    subtitle2: 'How treated',
    info2: [
      'Decrease blood glucose levels',
      'Strength training to increase muscle mass',
      'Increase restful sleep',
      'Stem cell or Exosome treatment'
    ],
  },

  ENDOCRINE_AGE_GENERIC: {
    ageomeType: 'endocrine_age',
    title: 'Endocrine Age',
    type: 'Generic',
    subtitle1: 'How measured',
    info1: [
      'Labs',
      'Biomarkers',
      'Gene expression'
    ],
    subtitle2: 'How treated',
    info2: [
      'Hormone replacement therapy',
      'Peptides',
      'Strength training',
      'Nutrition counseling'
    ],
  },

  LIVER_AGE_GENERIC: {
    ageomeType: 'liver_age',
    title: 'Liver Age',
    type: 'Generic',
    subtitle1: 'How measured',
    info1: [
      'Labs',
      'Biomarkers',
      'Liver fat on full-body MRI'
    ],
    subtitle2: 'How treated',
    info2: [
      'Nutrition and body mass consult',
      'Strength training',
      'Exosome treatment'
    ],
  },

  MUSCLE_AGE_PERSONAL: {
    ageomeType: 'muscle_age',
    title: 'Muscle Age',
    type: 'Personal',
    subtitle1: 'My Muscle Age Data',
    info1: [
      'Strength increased 20% between 05/04/2020 and 07/15/2020',
      'Grip strength test increased from average on 5/4/2020 to above average on 7/15/2020',
      'InBody assessment on 7/15/2020 indicates muscle imbalance of leg strength'
    ],
    subtitle2: 'My Muscle Age Checklist',
    info2: [
      'Increase frequency of strength test of legs to once per week',
      'Physical therapy consult for leg strength'
    ],
  },

  RENAL_AGE_PERSONAL: {
    ageomeType: 'renal_age',
    title: 'Renal/Kidney Age',
    type: 'Personal',
    subtitle1: 'My Renal/Kidney Age Data',
    info1: [],
    subtitle2: 'My Renal/Kidney Age Checklist',
    info2: [],
  },

  OVERALL_AGE_PERSONAL: {
    ageomeType: 'overall_age',
    title: 'Overall Biological Age',
    type: 'Personal',
    subtitle1: 'My Overall Age Data',
    info1: [],
    subtitle2: 'My Overall Age Checklist',
    info2: [],
  },

  ENDOCRINE_AGE_PERSONAL: {
    ageomeType: 'endocrine_age',
    title: 'Endocrine Age',
    type: 'Personal',
    subtitle1: 'My Endocrine Age Data',
    info1: [],
    subtitle2: 'My Endocrine Age Checklist',
    info2: [],
  },

  LIVER_AGE_PERSONAL: {
    ageomeType: 'liver_age',
    title: 'Liver Age',
    type: 'Personal',
    subtitle1: 'My Liver Age Data',
    info1: [],
    subtitle2: 'My Liver Age Checklist',
    info2: [],
  },
};
