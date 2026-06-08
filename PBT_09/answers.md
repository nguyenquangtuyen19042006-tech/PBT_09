# Phần A
## Câu A1

### 1. DOM Tree

```text
div#app
├── header
│   ├── h1
│   │   └── "Todo App"
│   └── nav
│       ├── a.active
│       │   └── "All"
│       ├── a
│       │   └── "Active"
│       └── a
│           └── "Completed"
│
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    │       └── "Add"
    │
    └── ul#todoList
        ├── li.todo-item
        │   └── "Learn HTML"
        └── li.todo-item.completed
            └── "Learn CSS"
```

---

### 2. Query Selector

#### Chọn thẻ `<h1>`

```js
document.querySelector("h1");
```

#### Chọn input trong form

```js
document.querySelector("#todoForm input");
```

#### Chọn tất cả `.todo-item`

```js
document.querySelectorAll(".todo-item");
```

#### Chọn link đang active

```js
document.querySelector("a.active");
```

#### Chọn `<li>` đầu tiên trong `#todoList`

```js
document.querySelector("#todoList li");
```

hoặc

```js
document.querySelector("#todoList li:first-child");
```

#### Chọn tất cả `<a>` bên trong `<nav>`

```js
document.querySelectorAll("nav a");
```
## Câu A2

### Khác nhau giữa `innerHTML` và `textContent`

#### `innerHTML`

* Đọc hoặc ghi nội dung dưới dạng **HTML**.
* Trình duyệt sẽ phân tích các thẻ HTML.

Ví dụ:

```js
document.getElementById("demo").innerHTML =
    "<b>Hello</b>";
```

Kết quả hiển thị:

```html
Hello
```

(chữ **Hello** được in đậm)

---

#### `textContent`

* Đọc hoặc ghi nội dung dưới dạng **text thuần**.
* Không phân tích thẻ HTML.

Ví dụ:

```js
document.getElementById("demo").textContent =
    "<b>Hello</b>";
```

Kết quả hiển thị:

```html
<b>Hello</b>
```

(thấy nguyên văn ký tự `<b>`)

---

### Dùng `innerHTML`

Khi muốn tạo HTML động:

```js
list.innerHTML =
    "<li>HTML</li><li>CSS</li>";
```

---

### Dùng `textContent`

Khi hiển thị dữ liệu do người dùng nhập hoặc dữ liệu từ API.

```js
message.textContent = userName;
```

An toàn hơn.

---

### Tại sao `innerHTML` gây XSS?

XSS (**Cross-Site Scripting**) xảy ra khi dữ liệu người dùng được chèn vào trang và được trình duyệt thực thi như mã HTML/JavaScript.

Ví dụ user nhập:

```html
<img src=x onerror="alert('Hacked!')">
```

Code:

```js
const userInput =
    document.querySelector("#search").value;

document.querySelector("#result").innerHTML =
    userInput;
```

Trình duyệt sẽ tạo thẻ:

```html
<img src="x" onerror="alert('Hacked!')">
```

Ảnh lỗi ⇒ `onerror` chạy ⇒

```js
alert("Hacked!");
```

Đây là lỗ hổng XSS.

---

### Cách sửa

Dùng `textContent` thay vì `innerHTML`:

```js
const userInput =
    document.querySelector("#search").value;

document.querySelector("#result").textContent =
    userInput;
```

Lúc này trình duyệt chỉ hiển thị:

```html
<img src=x onerror="alert('Hacked!')">
```

như văn bản thông thường và **không thực thi JavaScript**.

---


## Câu A3

Khi click vào button:

```html
<div id="outer">
    <div id="inner">
        <button id="btn">Click me</button>
    </div>
</div>
```

Sự kiện sẽ **bubbling** từ phần tử con lên phần tử cha:

```text
button → inner → outer
```

---

### Không dùng `stopPropagation()`

Output:

```text
BUTTON
INNER
OUTER
```

Giải thích:

1. Click vào `button`
2. Chạy event của `#btn`
3. Nổi bọt (bubble) lên `#inner`
4. Tiếp tục nổi bọt lên `#outer`

---

### Có `e.stopPropagation()`

```js
document.querySelector("#btn").addEventListener("click", (e) => {
    console.log("BUTTON");
    e.stopPropagation();
});
```

Output:

```text
BUTTON
```

Giải thích:

* `stopPropagation()` chặn sự kiện lan lên phần tử cha.
* Sau khi chạy event của button, sự kiện dừng lại.
* `INNER` và `OUTER` không được gọi.

---


# Phần C
## Câu C1

### Các lỗi và cách sửa

#### 1. Sai event `"onclick"`
```js
addEventListener("onclick", function() {
```
```js
addEventListener("click", function() {
```
---

#### 2. Gán lại cho biến `const`
```js
countDisplay = count;
```

`countDisplay` là `const`, không được gán lại.

```js
countDisplay.textContent = count;
```
---

#### 3. Xóa history sai cách
```js
historyList.innerHTML = null;
```
```js
historyList.innerHTML = "";
```
---
#### 4. `item.remove` thiếu `()`

```js
item.remove;
```
Đây chỉ là tham chiếu hàm.

```js
item.remove();
```
---

#### 5. `localStorage.getItem()` trả về string

```js
count = localStorage.getItem("count");
```

Ví dụ count sẽ là `"5"` thay vì `5`.

```js
count = Number(localStorage.getItem("count")) || 0;
```
---

#### 6. Không load lại history từ localStorage

Đã lưu:

```js
localStorage.setItem("history", historyList.innerHTML);
```
nhưng không khôi phục.

```js
historyList.innerHTML =
    localStorage.getItem("history") || "";
```
---

#### 7. Sau khi load history, click vào các item không xóa được

Các event listener trước đó không được lưu vào localStorage.

Giải pháp:

```js
historyList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        deleteHistory(e.target);
    }
});
```

=> dùng Event Delegation thay vì gắn listener cho từng `li`.

---

#### 8. Nên dùng `textContent` thay vì `innerHTML`

```js
countDisplay.innerHTML = count;
```

```js
countDisplay.textContent = count;
```

An toàn và phù hợp hơn.
---

### Code sửa các lỗi chính

```js
document.querySelector("#decrementBtn")
    .addEventListener("click", function () {
        count--;
        countDisplay.textContent = count;
    });

document.querySelector("#resetBtn")
    .addEventListener("click", () => {
        count = 0;
        countDisplay.textContent = count;
        historyList.innerHTML = "";
    });

document.querySelector("#clearHistory")
    .addEventListener("click", () => {
        const items = historyList.querySelectorAll("li");

        items.forEach(item => {
            item.remove();
        });
    });

window.addEventListener("load", () => {
    count =
        Number(localStorage.getItem("count")) || 0;

    countDisplay.textContent = count;

    historyList.innerHTML =
        localStorage.getItem("history") || "";
});
```
### Tổng kết lỗi

1. `"onclick"` → `"click"`
2. Gán lại `const countDisplay`
3. `innerHTML = null`
4. `item.remove` thiếu `()`
5. `getItem()` trả string
6. Không load lại history
7. Event listener của history bị mất sau reload
8. Nên dùng `textContent` thay `innerHTML`


## Câu C2

**1. Tại sao bind event lên 1000 elements là bad practice?**

* Tạo **1000 event listeners** → tốn bộ nhớ.
* Tốn thời gian khởi tạo.
* Khó quản lý khi thêm/xóa phần tử.

**Event Delegation:**

Gắn **1 listener lên phần tử cha**, tận dụng Event Bubbling.

```js
document.body.addEventListener("click", (e) => {
    if (e.target.matches(".item")) {
        console.log("clicked");
    }
});
```

→ Chỉ cần **1 listener** thay vì 1000.

---

**2. Dùng DocumentFragment**

```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

**Tại sao nhanh hơn?**

* Thêm 1000 phần tử vào `fragment` chỉ diễn ra trong bộ nhớ.
* Cuối cùng mới append vào DOM **1 lần**.
* Giảm số lần **reflow/repaint** từ ~1000 xuống 1 lần.
