package models

type GameScore struct {
	Name      string `json:"name"`
	Score     int    `json:"score"`
	Mode      string `json:"mode"`
	Timestamp string `json:"timestamp"`
}

type ScoreWithRank struct {
	Name       string `json:"name"`
	Score      int    `json:"score"`
	Mode       string `json:"mode"`
	Timestamp  string `json:"timestamp"`
	Rank       int    `json:"rank"`
	Percentile int    `json:"percentile"`
}

type PaginatedResponse struct {
	Scores     []ScoreWithRank `json:"scores"`
	Page       int             `json:"page"`
	TotalPages int             `json:"totalPages"`
	Total      int             `json:"total"`
}
