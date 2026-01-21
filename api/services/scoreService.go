package services

import (
	"makeyourgame/api/models"
	"math"
	"sort"
)

func GetPercentile(scores []models.GameScore, score models.ScoreWithRank) models.ScoreWithRank {
	total := len(scores)
	if total == 0 {
		score.Percentile = 0
		return score
	}

	percentile := ((total - score.Rank) * 100) / total
	score.Percentile = percentile

	return score
}

// Trie les scores par ordre décroissant
func SortScores(scores []models.GameScore) []models.GameScore {
	sorted := make([]models.GameScore, len(scores))
	copy(sorted, scores)

	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i].Score > sorted[j].Score
	})

	return sorted
}

// Calcule le range et le percentile
func GetRank(scores []models.GameScore) []models.ScoreWithRank {
	total := len(scores)
	result := make([]models.ScoreWithRank, total)

	for i, score := range scores {
		rank := i + 1
		result[i] = models.ScoreWithRank{
			Name:      score.Name,
			Score:     score.Score,
			Mode:      score.Mode,
			Timestamp: score.Timestamp,
			Rank:      rank,
		}
	}

	return result
}

// Renvoie les scores à afficher sur une page donnée
func GetPaginatedScores(scores []models.GameScore, page int) models.PaginatedResponse {
	sorted := SortScores(scores)
	ranked := GetRank(sorted)
	pageSize := 5
	total := len(scores)
	totalPages := int(math.Ceil(float64(total) / float64(pageSize)))

	if total == 0 {
		return models.PaginatedResponse{}
	}

	if page < 1 {
		page = 1
	}
	if page > totalPages {
		page = totalPages
	}

	start := (page - 1) * pageSize
	end := start + pageSize

	if start > total {
		return models.PaginatedResponse{
			Scores:     []models.ScoreWithRank{},
			Page:       page,
			TotalPages: totalPages,
			Total:      total,
		}
	}

	if end > total {
		end = total
	}

	return models.PaginatedResponse{
		Scores:     ranked[start:end],
		Page:       page,
		TotalPages: totalPages,
		Total:      total,
	}
}
