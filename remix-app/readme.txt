npx create-react-router@latest --template remix-run/react-router/tutorials/address-book


| 名称                         | 语言 / 框架    | 特点                                          | 开源  | 链接                                                                                                       |
| -------------------------- | ---------- | ------------------------------------------- | --- | -------------------------------------------------------------------------------------------------------- |
| **card-validator**         | JavaScript | 🔹最轻量的信用卡验证库<br>🔹支持 Luhn 校验、卡种识别、长度检测      | ✅ 是 | [https://github.com/braintree/card-validator](https://github.com/braintree/card-validator)               |
| **cleave.js**              | JavaScript | 🔹自动输入格式化（空格、日期、金额）<br>🔹支持信用卡识别和动态掩码       | ✅ 是 | [https://nosir.github.io/cleave.js/](https://nosir.github.io/cleave.js/)                                 |
| **react-credit-cards-2**   | React      | 🔹显示漂亮的信用卡 UI + 输入交互<br>🔹可识别卡种 + 格式化 + 校验  | ✅ 是 | [https://www.npmjs.com/package/react-credit-cards-2](https://www.npmjs.com/package/react-credit-cards-2) |
| **Payment.js (by Stripe)** | JS（独立版）    | 🔹旧版 Stripe Elements 的简化版本<br>🔹只做前端验证，不发请求 | ✅ 是 | [https://github.com/jessepollak/payment](https://github.com/jessepollak/payment)                         |

| 品牌                          | 卡号长度               | 起始数字（BIN/IIN 前缀）  | 说明                            |
| --------------------------- | ------------------ | ----------------- | ----------------------------- |
| **Visa**                    | 16 位（有时 13 或 19 位） | 4 开头              | 全球最常见，银行或发卡机构可能发 13、16、19 位变体 |
| **Mastercard**              | 16 位               | 51–55 或 2221–2720 | 新旧 BIN 段并存                    |
| **American Express (Amex)** | **15 位**           | 34 或 37           | 注意长度比常见的短一位                   |
| **Discover**                | 16 位               | 6011、65、644–649   | 北美常见                          |
| **JCB**                     | 16 位               | 3528–3589         | 日本及亚洲常见                       |
| **Diners Club**             | 14 或 16 位          | 36、38、39、30xx     | 有些与 MasterCard 联名后为 16 位      |
| **UnionPay（银联）**            | 16–19 位            | 62 开头             | 中国/亚洲常见，长度不固定                 |
| **Maestro**                 | 12–19 位            | 各种（50, 56–69）     | 可变长度，Mastercard 系列            |
| **Elo / Hipercard（巴西）**     | 16 位               | 本地品牌              | 本地市场特定规则                      |
