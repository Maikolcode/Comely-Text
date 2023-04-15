export interface Toggle {
  type: ToggleType;
  status: boolean
}

export interface ToggleFlags {
  grammar: boolean;
  enrich: boolean
}

export type ToggleType = 'enrich' | 'grammar';
