package main

import (
"context"
"encoding/json"
"log"
"net/http"
"time"

"github.com/gorilla/mux"
"github.com/rs/cors"
"go.mongodb.org/mongo-driver/bson"
"go.mongodb.org/mongo-driver/mongo"
"go.mongodb.org/mongo-driver/mongo/options"
"golang.org/x/crypto/bcrypt"
)

var client *mongo.Client
var userCollection *mongo.Collection
var resumeCollection *mongo.Collection

type User struct {
Name     string `json:"name"`
Email    string `json:"email"`
Password string `json:"password"`
}

type Resume struct {
UserID     string        `json:"userId"`
Name       string        `json:"name"`
Email      string        `json:"email"`
Phone      string        `json:"phone"`
Skills     []string      `json:"skills"`
Languages  []string      `json:"languages"`
Education  interface{}   `json:"education"`
Experience interface{}   `json:"experience"`
Projects   interface{}   `json:"projects"`
}

func connectDB() {

ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()

clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

var err error

client, err = mongo.Connect(ctx, clientOptions)

if err != nil {
log.Fatal(err)
}

db := client.Database("resume-builder")

userCollection = db.Collection("users")
resumeCollection = db.Collection("resumes")

log.Println("MongoDB Connected")
}

func signup(w http.ResponseWriter, r *http.Request) {

var user User

json.NewDecoder(r.Body).Decode(&user)

hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)

user.Password = string(hashedPassword)

userCollection.InsertOne(context.TODO(), user)

json.NewEncoder(w).Encode("Signup Successful")

}

func login(w http.ResponseWriter, r *http.Request) {

var user User
var dbUser User

json.NewDecoder(r.Body).Decode(&user)

err := userCollection.FindOne(context.TODO(), bson.M{
"email": user.Email,
}).Decode(&dbUser)

if err != nil {
http.Error(w, "User not found", http.StatusUnauthorized)
return
}

err = bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))

if err != nil {
http.Error(w, "Invalid password", http.StatusUnauthorized)
return
}

json.NewEncoder(w).Encode("Login Successful")

}

func saveResume(w http.ResponseWriter, r *http.Request) {

var resume Resume

json.NewDecoder(r.Body).Decode(&resume)

resumeCollection.InsertOne(context.TODO(), resume)

json.NewEncoder(w).Encode("Resume Saved")

}

func getResume(w http.ResponseWriter, r *http.Request) {

userId := r.URL.Query().Get("userId")

cursor, _ := resumeCollection.Find(context.TODO(), bson.M{
"userId": userId,
})

var resumes []Resume

cursor.All(context.TODO(), &resumes)

json.NewEncoder(w).Encode(resumes)

}

func main() {

connectDB()

router := mux.NewRouter()

router.HandleFunc("/signup", signup).Methods("POST")
router.HandleFunc("/login", login).Methods("POST")
router.HandleFunc("/save-resume", saveResume).Methods("POST")
router.HandleFunc("/get-resume", getResume).Methods("GET")

c := cors.New(cors.Options{
AllowedOrigins: []string{"http://localhost:3000"},
AllowedMethods: []string{"GET", "POST"},
AllowedHeaders: []string{"*"},
})

handler := c.Handler(router)

log.Println("Server running on port 5000")

http.ListenAndServe(":5000", handler)
}