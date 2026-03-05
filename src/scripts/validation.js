const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

// Проверяет валидность поля
const checkInputValidity = (formElement, inputElement, settings) => {
    // Сначала сбрасываем кастомную ошибку
    inputElement.setCustomValidity('');
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage || '');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

// Проверяет, есть ли хотя бы одно невалидное поле
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Делает кнопку неактивной
const disableSubmitButton = (buttonElement, settings) => {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
};

// Делает кнопку активной
const enableSubmitButton = (buttonElement, settings) => {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
};

// Переключает состояние кнопки
const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        disableSubmitButton(buttonElement, settings);
    } else {
        enableSubmitButton(buttonElement, settings);
    }
};

// Устанавливает слушатели на все поля формы
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    // Проверяем состояние кнопки при инициализации
    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

// Включает валидацию для всех форм
export const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, settings);
    });
};