import axios from "axios";

const api = axios.create({
    baseURL: "https://nomoreparties.co/v1/apf-cohort-202",
    headers: {
        authorization: "1cc544f3-d3a9-4149-8ba8-d1fa6bf945ef",
        "Content-Type": "application/json",
    },
});

// Вспомогательная функция: axios возвращает данные внутри свойства .data
const getData = (res) => res.data;

export const getUserInfo = () => {
    return api.get("/users/me").then(getData);
};

export const getInitialCards = () => {
    return api.get("/cards").then(getData);
};

export const updateUserInfo = (name, about) => {
    return api.patch("/users/me", { name, about }).then(getData);
};

export const updateUserAvatar = (avatarLink) => {
    return api.patch("/users/me/avatar", { avatar: avatarLink }).then(getData);
};

export const addNewCard = (name, link) => {
    return api.post("/cards", { name, link }).then(getData);
};

export const deleteCardApi = (cardId) => {
    return api.delete(`/cards/${cardId}`).then(getData);
};

export const likeCardApi = (cardId) => {
    return api.put(`/cards/likes/${cardId}`).then(getData);
};

export const unlikeCardApi = (cardId) => {
    return api.delete(`/cards/likes/${cardId}`).then(getData);
};