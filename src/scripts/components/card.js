const getTemplate = () => {
    return document
        .getElementById("card-template")
        .content.querySelector(".card")
        .cloneNode(true);
};

export const createCardElement = (
    cardData,
    currentUserId,
    { onPreviewPicture, onDeleteCard, onLikeCard }
) => {
    const cardElement = getTemplate();
    const likeButton = cardElement.querySelector(".card__like-button");
    const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
    const cardImage = cardElement.querySelector(".card__image");
    const likeCounter = cardElement.querySelector(".card__like-count");

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector(".card__title").textContent = cardData.name;

    likeCounter.textContent = cardData.likes.length;

    const isLiked = cardData.likes.some((user) => user._id === currentUserId);
    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");
    }

    likeButton.addEventListener("click", () => {
        onLikeCard(likeButton, cardData._id, likeCounter);
    });

    if (cardData.owner._id === currentUserId) {
        deleteButton.addEventListener("click", () => {
            onDeleteCard(cardData._id, cardElement);
        });
    } else {
        deleteButton.remove();
    }

    cardImage.addEventListener("click", () => {
        onPreviewPicture({ name: cardData.name, link: cardData.link });
    });

    return cardElement;
};

export const toggleLikeState = (likeButton, isLiked, likeCounter, likesCount) => {
    likeButton.classList.toggle("card__like-button_is-active", isLiked);
    likeCounter.textContent = likesCount;
};
