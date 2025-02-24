export interface Model {
  id: number;
  name: string;
  model_architecture: string;
  final_loss: number;
  model_path: string;
  bentoml_tag: string;
  is_active: boolean;
  created_at: string; // ISO date string
  csv_id: number;
  version: string;
  description: string;
}