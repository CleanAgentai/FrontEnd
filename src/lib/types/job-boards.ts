export interface JobBoard {
  id: string;
  user_id: string;
  title: string | null;
  description: string | null;
  is_public: boolean;
  view_count: number;
  share_count: number;
  created_at: string;
  updated_at: string;
  profiles?: {
    company_name: string;
    slug: string;
  };
}

export interface JobBoardView {
  id: string;
  job_board_id: string;
  user_agent: string;
  created_at: string;
}