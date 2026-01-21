package main

import (
	"fmt"
	"log"
	"makeyourgame/api/handlers"
	"makeyourgame/api/storage"
	"net/http"
)

func main() {

	store, _ := storage.NewScoreStore("api/storage/scores.json")

	http.HandleFunc("/scores", func(w http.ResponseWriter, r *http.Request) {

		// CORS
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Preflight
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		switch r.Method {
		case http.MethodGet:
			handlers.ScoreboardHandler(store)(w, r)

		case http.MethodPost:
			handlers.ScoreHandler(store)(w, r)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)

		}
	})

	fmt.Println("Serveur lancé, API opérationnelle")
	if err := http.ListenAndServe(":5280", nil); err != nil {
		log.Fatal("Erreur au lancement du serveur API: ", err)
	}

}
