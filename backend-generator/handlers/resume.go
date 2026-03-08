package handlers

import (
"context"
"encoding/json"
"net/http"

"resume-backend/database"
"resume-backend/models"
)

func SaveResume(w http.ResponseWriter, r *http.Request) {

var resume models.Resume

json.NewDecoder(r.Body).Decode(&resume)

collection := database.DB.Collection("resumes")

collection.InsertOne(context.TODO(), resume)

json.NewEncoder(w).Encode("Resume Saved")

}

func GetResume(w http.ResponseWriter, r *http.Request) {

userId := r.URL.Query().Get("userId")

collection := database.DB.Collection("resumes")

cursor, _ := collection.Find(context.TODO(), map[string]string{
"userId": userId,
})

var resumes []models.Resume

cursor.All(context.TODO(), &resumes)

json.NewEncoder(w).Encode(resumes)

}