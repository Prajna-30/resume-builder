package handlers

import (
"context"
"encoding/json"
"net/http"

"resume-backend/database"
"resume-backend/models"

"golang.org/x/crypto/bcrypt"
)

func Signup(w http.ResponseWriter, r *http.Request) {

var user models.User

json.NewDecoder(r.Body).Decode(&user)

hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), 14)

user.Password = string(hashedPassword)

collection := database.DB.Collection("users")

collection.InsertOne(context.TODO(), user)

json.NewEncoder(w).Encode("User Created")

}

func Login(w http.ResponseWriter, r *http.Request) {

var user models.User
var dbUser models.User

json.NewDecoder(r.Body).Decode(&user)

collection := database.DB.Collection("users")

collection.FindOne(context.TODO(), map[string]string{
"email": user.Email,
}).Decode(&dbUser)

err := bcrypt.CompareHashAndPassword(
[]byte(dbUser.Password),
[]byte(user.Password),
)

if err != nil {

http.Error(w, "Invalid Password", http.StatusUnauthorized)
return

}

json.NewEncoder(w).Encode("Login Successful")

}