const form = document.querySelector("#registerForm");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput =
    document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");

const submitBtn =
    document.querySelector("#submitBtn");

let valid = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

function updateSubmit() {
    submitBtn.disabled =
        !Object.values(valid)
            .every(Boolean);
}

// ==================== NAME

nameInput.addEventListener("input", () => {
    const value = nameInput.value.trim();

    const error =
        document.querySelector("#nameError");

    if (
        value.length >= 2 &&
        value.length <= 50
    ) {
        error.textContent = "✅ Hợp lệ";
        error.className = "valid";
        valid.name = true;
    } else {
        error.textContent =
            "❌ 2-50 ký tự";
        error.className = "invalid";
        valid.name = false;
    }

    updateSubmit();
});

// ==================== EMAIL

emailInput.addEventListener("input", () => {
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const error =
        document.querySelector("#emailError");

    if (
        emailRegex.test(
            emailInput.value
        )
    ) {
        error.textContent =
            "✅ Email hợp lệ";

        error.className = "valid";

        valid.email = true;
    } else {
        error.textContent =
            "❌ Email không hợp lệ";

        error.className = "invalid";

        valid.email = false;
    }

    updateSubmit();
});

// ==================== PASSWORD

passwordInput.addEventListener(
    "input",
    () => {

        const value =
            passwordInput.value;

        const bar =
            document.querySelector(
                "#strengthBar"
            );

        const text =
            document.querySelector(
                "#strengthText"
            );

        if (
            value.length < 8
        ) {
            bar.style.width = "33%";
            bar.style.background =
                "red";

            text.textContent =
                "Yếu";

            valid.password =
                false;
        }

        else if (
            /[A-Za-z]/.test(value) &&
            /\d/.test(value)
        ) {
            bar.style.width =
                "66%";

            bar.style.background =
                "orange";

            text.textContent =
                "Trung bình";

            valid.password =
                true;
        }

        if (
            /[a-z]/.test(value) &&
            /[A-Z]/.test(value) &&
            /\d/.test(value) &&
            /[^A-Za-z0-9]/.test(value) &&
            value.length >= 8
        ) {
            bar.style.width =
                "100%";

            bar.style.background =
                "green";

            text.textContent =
                "Mạnh";

            valid.password =
                true;
        }

        checkConfirm();
        updateSubmit();
    }
);

// ==================== CONFIRM

function checkConfirm() {

    const error =
        document.querySelector(
            "#confirmError"
        );

    if (
        confirmInput.value ===
            passwordInput.value &&
        confirmInput.value
    ) {
        error.textContent =
            "✅ Khớp";

        error.className =
            "valid";

        valid.confirm =
            true;
    } else {
        error.textContent =
            "❌ Không khớp";

        error.className =
            "invalid";

        valid.confirm =
            false;
    }
}

confirmInput.addEventListener(
    "input",
    () => {
        checkConfirm();
        updateSubmit();
    }
);

// ==================== PHONE

phoneInput.addEventListener(
    "input",
    () => {

        let value =
            phoneInput.value
                .replace(/\D/g, "")
                .slice(0, 10);

        if (
            value.length > 4
        ) {
            value =
                value.slice(0,4)
                + "-"
                + value.slice(4);
        }

        if (
            value.length > 8
        ) {
            value =
                value.slice(0,8)
                + "-"
                + value.slice(8);
        }

        phoneInput.value =
            value;

        const error =
            document.querySelector(
                "#phoneError"
            );

        if (
            /^\d{4}-\d{3}-\d{3}$/
            .test(value)
        ) {
            error.textContent =
                "✅ Hợp lệ";

            error.className =
                "valid";

            valid.phone =
                true;
        } else {
            error.textContent =
                "❌ Sai định dạng";

            error.className =
                "invalid";

            valid.phone =
                false;
        }

        updateSubmit();
    }
);

// ==================== SUBMIT

form.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const modal =
            document.createElement(
                "div"
            );

        modal.className =
            "modal";

        modal.innerHTML = `
            <div class="modal-content">
                <h2>
                    Đăng ký thành công!
                </h2>

                <p>
                    Tên:
                    ${nameInput.value}
                </p>

                <p>
                    Email:
                    ${emailInput.value}
                </p>

                <p>
                    Phone:
                    ${phoneInput.value}
                </p>
            </div>
        `;

        modal.addEventListener(
            "click",
            () => modal.remove()
        );

        document.body.appendChild(
            modal
        );
    }
);