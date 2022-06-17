// import "./styles.css";

const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const QUANTITY = 8;

let code = "";

function optCreateItem() {
  const otpItem = document.createElement("div");

  otpItem.classList.add("otp-item");

  return otpItem;
}

function otpInit(quantity) {
  const otpController = $(".otp-controller");
  const otpInput = $(".otp-controller .otp-input");

  const items = Array(quantity)
    .fill(1)
    .map(() => optCreateItem());
  otpController.append(...items);

  otpInput.addEventListener("keydown", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (code.length < QUANTITY) {
      if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105)
      ) {
        setOtpValue(code + e.key);
      }
    }

    if (e.code === "Backspace" && code.length) {
      setOtpValue(code.slice(0, code.length - 1));
    }
  });

  otpInput.addEventListener("focus", () => focusOnCurrentItem(code));
  otpInput.addEventListener("blur", () => focusOnBlur());
}

function setOtpValue(value) {
  const otpInput = $(".otp-controller .otp-input");
  const otpItems = $$(".otp-controller .otp-item");
  const listValue = value
    .split("")
    .filter((n) => !isNaN(n))
    .slice(0, QUANTITY);

  code = listValue.join("");
  otpInput.value = code;

  otpItems.forEach((el, i) => {
    el.innerText = !isNaN(listValue[i]) ? listValue[i] : "";
  });

  focusOnCurrentItem(value);
}

function focusOnBlur() {
  const otpItems = $$(".otp-controller .otp-item");

  otpItems.forEach((el) => {
    el.classList.remove("active");
    el.classList.remove("pointertext");
  });
}

function focusOnCurrentItem(value) {
  const otpInput = $(".otp-controller .otp-input");
  const otpItems = $$(".otp-controller .otp-item");
  const listValue = value.split("").filter((n) => !isNaN(n));

  otpInput.focus();
  focusOnBlur();

  if (!listValue.length) {
    otpItems[0].classList.add("active");
    otpItems[0].classList.add("pointertext");

    return;
  }

  if (listValue.length === otpItems.length) {
    otpItems[otpItems.length - 1].classList.add("active");

    return;
  }

  if (listValue.length < otpItems.length) {
    otpItems[listValue.length].classList.add("active");
    otpItems[listValue.length].classList.add("pointertext");
  } else {
    otpItems[otpItems.length - 1].classList.add("active");
  }
}

otpInit(QUANTITY);
setOtpValue("03nn2564");
