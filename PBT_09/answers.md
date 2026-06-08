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


