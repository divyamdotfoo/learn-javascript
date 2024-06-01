import { Main } from "@/components/client/main";
import { Header } from "@/components/header";
import { PATHS } from "@/lib/constants";
import { Question } from "@/types";
import Link from "next/link";

export default async function Page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  try {
    // const questions = await buildRegistryForLang(PATHS[lang]);
    const questions: Question[] = [
      {
        id: "1uwet9",
        question: "What's the output?",
        options: [
          { value: "A", text: "`0 1 2` and `0 1 2`" },
          { value: "B", text: "`0 1 2` and `3 3 3`" },
          { value: "C", text: "`3 3 3` and `0 1 2`" },
        ],
        answer: "C",
        explanation:
          "Because of the event queue in JavaScript, the `setTimeout` callback function is called _after_ the loop has been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example.In the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let` (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will have a new value, and each value is scoped inside the loop.",
        code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n",
      },
      {
        id: "G0AOWb",
        question: "What's the output?",
        options: [
          { value: "A", text: "`20` and `62.83185307179586`" },
          { value: "B", text: "`20` and `NaN`" },
          { value: "C", text: "`20` and `63`" },
          { value: "D", text: "`NaN` and `63`" },
        ],
        answer: "B",
        explanation:
          "Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function.With arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope (window for example).Since there is no value `radius` in the scope of the arrow function, `this.radius` returns `undefined` which, when multiplied by `2 * Math.PI`, results in `NaN`.",
        code: "const shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2;\n  },\n  perimeter: () => 2 * Math.PI * this.radius,\n};\n\nconsole.log(shape.diameter());\nconsole.log(shape.perimeter());\n",
      },
      {
        id: "nOSfZk",
        question: "What's the output?",
        options: [
          { value: "A", text: "`1` and `false`" },
          { value: "B", text: "`false` and `NaN`" },
          { value: "C", text: "`false` and `false`" },
        ],
        answer: "A",
        explanation:
          "The unary plus tries to convert an operand to a number. `true` is `1`, and `false` is `0`.The string `'Lydia'` is a truthy value. What we're actually asking, is \"Is this truthy value falsy?\". This returns `false`.",
        code: "+true;\n!'Lydia';\n",
      },
      {
        id: "vhY2Ip",
        question: "Which one is true?",
        options: [
          { value: "A", text: "`mouse.bird.size` is not valid" },
          { value: "B", text: "`mouse[bird.size]` is not valid" },
          { value: "C", text: '`mouse[bird["size"]]` is not valid' },
          { value: "D", text: "All of them are valid" },
        ],
        answer: "A",
        explanation:
          'In JavaScript, all object keys are strings (unless it\'s a Symbol). Even though we might not _type_ them as strings, they are always converted into strings under the hood.JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket `[` and keeps going until it finds the closing bracket `]`. Only then, it will evaluate the statement.`mouse[bird.size]`: First it evaluates `bird.size`, which is `"small"`. `mouse["small"]` returns `true`However, with dot notation, this doesn\'t happen. `mouse` does not have a key called `bird`, which means that `mouse.bird` is `undefined`. Then, we ask for the `size` using dot notation: `mouse.bird.size`. Since `mouse.bird` is `undefined`, we\'re actually asking `undefined.size`. This isn\'t valid, and will throw an error similar to `Cannot read property "size" of undefined`.',
        code: "const bird = {\n  size: 'small',\n};\n\nconst mouse = {\n  name: 'Mickey',\n  small: true,\n};\n",
      },
      {
        id: "PjJTk1",
        question: "What's the output?",
        options: [
          { value: "A", text: "`Hello`" },
          { value: "B", text: "`Hey!`" },
          { value: "C", text: "`undefined`" },
          { value: "D", text: "`ReferenceError`" },
          { value: "E", text: "`TypeError`" },
        ],
        answer: "A",
        explanation:
          'In JavaScript, all objects interact by _reference_ when setting them equal to each other.First, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object.<img src="https://i.imgur.com/ko5k0fs.png" width="200">When you change one object, you change all of them.',
        code: "let c = { greeting: 'Hey!' };\nlet d;\n\nd = c;\nc.greeting = 'Hello';\nconsole.log(d.greeting);\n",
      },
      {
        id: "FvVcRH",
        question: "What's the output?",
        options: [
          { value: "A", text: "`true` `false` `true`" },
          { value: "B", text: "`false` `false` `true`" },
          { value: "C", text: "`true` `false` `false`" },
          { value: "D", text: "`false` `true` `true`" },
        ],
        answer: "C",
        explanation:
          "`new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.When we use the `==` operator (Equality operator), it only checks whether it has the same _value_. They both have the value of `3`, so it returns `true`.However, when we use the `===` operator (Strict equality operator), both value _and_ type should be the same. It's not: `new Number()` is not a number, it's an **object**. Both return `false.`",
        code: "let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);\n",
      },
      {
        id: "U2tjOs",
        question: "What's the output?",
        options: [
          { value: "A", text: "`orange`" },
          { value: "B", text: "`purple`" },
          { value: "C", text: "`green`" },
          { value: "D", text: "`TypeError`" },
        ],
        answer: "D",
        explanation:
          "The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class Chameleon, the function cannot be called upon it. A `TypeError` is thrown.",
        code: "class Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor;\n    return this.newColor;\n  }\n\n  constructor({ newColor = 'green' } = {}) {\n    this.newColor = newColor;\n  }\n}\n\nconst freddie = new Chameleon({ newColor: 'purple' });\nconsole.log(freddie.colorChange('orange'));\n",
      },
      {
        id: "D786wK",
        question: "What's the output?",
        options: [
          { value: "A", text: "`{}`" },
          { value: "B", text: "`ReferenceError" },
          { value: "C", text: "`undefined`" },
        ],
        answer: "A",
        explanation:
          'It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as:1. `global.greetign = {}` in Node.js\n2. `window.greetign = {}`, `frames.greetign = {}` and `self.greetign` in browsers.\n3. `self.greetign` in web workers.\n4. `globalThis.greetign` in all environments.In order to avoid this, we can use `"use strict"`. This makes sure that you have declared a variable before setting it equal to anything.',
        code: "let greeting;\ngreetign = {}; // Typo!\nconsole.log(greetign);\n",
      },
      {
        id: "LizbJ6",
        question: "What happens when we do this?",
        options: [
          { value: "A", text: "Nothing, this is totally fine!" },
          {
            value: "B",
            text: "`SyntaxError`. You cannot add properties to a function this way.",
          },
          { value: "C", text: '`"Woof"` gets logged.' },
          { value: "D", text: "`ReferenceError`" },
        ],
        answer: "A",
        explanation:
          "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.",
        code: "function bark() {\n  console.log('Woof!');\n}\n\nbark.animal = 'dog';\n",
      },
    ];

    return (
      <div className="relative max-w-7xl mx-auto py-2 sm:px-6 px-4">
        <Header defaultLang={lang} />
        <Main allQuestions={questions} />
        <Socials />
      </div>
    );
  } catch (e) {}
}

export async function generateStaticParams() {
  return Object.keys(PATHS).map((s) => ({ lang: s }));
}

function Socials() {
  return (
    <div className=" flex items-center gap-4 w-full justify-center py-6">
      <Link
        href={"https://github.com/divyamdotfoo/learn-javascript"}
        className=" w-7 h-7 block hover:scale-105 transition-all"
        target="_blank"
      >
        <svg
          viewBox="0 0 98 96"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            fill="#000"
          />
        </svg>
      </Link>
      <Link
        href={"https://twitter.com/divyamdotfoo"}
        className=" hover:scale-105 transition-all"
        target="_blank"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className=" h-6 fill-black">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </Link>
    </div>
  );
}

const getQ = () => ({
  german: [
    {
      id: "1uwet9",
      question: "What's the output?",
      options: [
        { value: "A", text: "`0 1 2` and `0 1 2`" },
        { value: "B", text: "`0 1 2` and `3 3 3`" },
        { value: "C", text: "`3 3 3` and `0 1 2`" },
      ],
      answer: "C",
      explanation:
        "Because of the event queue in JavaScript, the `setTimeout` callback function is called _after_ the loop has been executed. Since the variable `i` in the first loop was declared using the `var` keyword, this value was global. During the loop, we incremented the value of `i` by `1` each time, using the unary operator `++`. By the time the `setTimeout` callback function was invoked, `i` was equal to `3` in the first example.In the second loop, the variable `i` was declared using the `let` keyword: variables declared with the `let` (and `const`) keyword are block-scoped (a block is anything between `{ }`). During each iteration, `i` will have a new value, and each value is scoped inside the loop.",
      code: "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1);\n}\n",
    },
    {
      id: "G0AOWb",
      question: "What's the output?",
      options: [
        { value: "A", text: "`20` and `62.83185307179586`" },
        { value: "B", text: "`20` and `NaN`" },
        { value: "C", text: "`20` and `63`" },
        { value: "D", text: "`NaN` and `63`" },
      ],
      answer: "B",
      explanation:
        "Note that the value of `diameter` is a regular function, whereas the value of `perimeter` is an arrow function.With arrow functions, the `this` keyword refers to its current surrounding scope, unlike regular functions! This means that when we call `perimeter`, it doesn't refer to the shape object, but to its surrounding scope (window for example).Since there is no value `radius` in the scope of the arrow function, `this.radius` returns `undefined` which, when multiplied by `2 * Math.PI`, results in `NaN`.",
      code: "const shape = {\n  radius: 10,\n  diameter() {\n    return this.radius * 2;\n  },\n  perimeter: () => 2 * Math.PI * this.radius,\n};\n\nconsole.log(shape.diameter());\nconsole.log(shape.perimeter());\n",
    },
    {
      id: "nOSfZk",
      question: "What's the output?",
      options: [
        { value: "A", text: "`1` and `false`" },
        { value: "B", text: "`false` and `NaN`" },
        { value: "C", text: "`false` and `false`" },
      ],
      answer: "A",
      explanation:
        "The unary plus tries to convert an operand to a number. `true` is `1`, and `false` is `0`.The string `'Lydia'` is a truthy value. What we're actually asking, is \"Is this truthy value falsy?\". This returns `false`.",
      code: "+true;\n!'Lydia';\n",
    },
    {
      id: "vhY2Ip",
      question: "Which one is true?",
      options: [
        { value: "A", text: "`mouse.bird.size` is not valid" },
        { value: "B", text: "`mouse[bird.size]` is not valid" },
        { value: "C", text: '`mouse[bird["size"]]` is not valid' },
        { value: "D", text: "All of them are valid" },
      ],
      answer: "A",
      explanation:
        'In JavaScript, all object keys are strings (unless it\'s a Symbol). Even though we might not _type_ them as strings, they are always converted into strings under the hood.JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket `[` and keeps going until it finds the closing bracket `]`. Only then, it will evaluate the statement.`mouse[bird.size]`: First it evaluates `bird.size`, which is `"small"`. `mouse["small"]` returns `true`However, with dot notation, this doesn\'t happen. `mouse` does not have a key called `bird`, which means that `mouse.bird` is `undefined`. Then, we ask for the `size` using dot notation: `mouse.bird.size`. Since `mouse.bird` is `undefined`, we\'re actually asking `undefined.size`. This isn\'t valid, and will throw an error similar to `Cannot read property "size" of undefined`.',
      code: "const bird = {\n  size: 'small',\n};\n\nconst mouse = {\n  name: 'Mickey',\n  small: true,\n};\n",
    },
    {
      id: "PjJTk1",
      question: "What's the output?",
      options: [
        { value: "A", text: "`Hello`" },
        { value: "B", text: "`Hey!`" },
        { value: "C", text: "`undefined`" },
        { value: "D", text: "`ReferenceError`" },
        { value: "E", text: "`TypeError`" },
      ],
      answer: "A",
      explanation:
        'In JavaScript, all objects interact by _reference_ when setting them equal to each other.First, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object.<img src="https://i.imgur.com/ko5k0fs.png" width="200">When you change one object, you change all of them.',
      code: "let c = { greeting: 'Hey!' };\nlet d;\n\nd = c;\nc.greeting = 'Hello';\nconsole.log(d.greeting);\n",
    },
    {
      id: "FvVcRH",
      question: "What's the output?",
      options: [
        { value: "A", text: "`true` `false` `true`" },
        { value: "B", text: "`false` `false` `true`" },
        { value: "C", text: "`true` `false` `false`" },
        { value: "D", text: "`false` `true` `true`" },
      ],
      answer: "C",
      explanation:
        "`new Number()` is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.When we use the `==` operator (Equality operator), it only checks whether it has the same _value_. They both have the value of `3`, so it returns `true`.However, when we use the `===` operator (Strict equality operator), both value _and_ type should be the same. It's not: `new Number()` is not a number, it's an **object**. Both return `false.`",
      code: "let a = 3;\nlet b = new Number(3);\nlet c = 3;\n\nconsole.log(a == b);\nconsole.log(a === b);\nconsole.log(b === c);\n",
    },
    {
      id: "U2tjOs",
      question: "What's the output?",
      options: [
        { value: "A", text: "`orange`" },
        { value: "B", text: "`purple`" },
        { value: "C", text: "`green`" },
        { value: "D", text: "`TypeError`" },
      ],
      answer: "D",
      explanation:
        "The `colorChange` function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children or called upon class instances. Since `freddie` is an instance of class Chameleon, the function cannot be called upon it. A `TypeError` is thrown.",
      code: "class Chameleon {\n  static colorChange(newColor) {\n    this.newColor = newColor;\n    return this.newColor;\n  }\n\n  constructor({ newColor = 'green' } = {}) {\n    this.newColor = newColor;\n  }\n}\n\nconst freddie = new Chameleon({ newColor: 'purple' });\nconsole.log(freddie.colorChange('orange'));\n",
    },
    {
      id: "D786wK",
      question: "What's the output?",
      options: [
        { value: "A", text: "`{}`" },
        { value: "B", text: "`ReferenceError" },
        { value: "C", text: "`undefined`" },
      ],
      answer: "A",
      explanation:
        'It logs the object, because we just created an empty object on the global object! When we mistyped `greeting` as `greetign`, the JS interpreter actually saw this as:1. `global.greetign = {}` in Node.js\n2. `window.greetign = {}`, `frames.greetign = {}` and `self.greetign` in browsers.\n3. `self.greetign` in web workers.\n4. `globalThis.greetign` in all environments.In order to avoid this, we can use `"use strict"`. This makes sure that you have declared a variable before setting it equal to anything.',
      code: "let greeting;\ngreetign = {}; // Typo!\nconsole.log(greetign);\n",
    },
    {
      id: "LizbJ6",
      question: "What happens when we do this?",
      options: [
        { value: "A", text: "Nothing, this is totally fine!" },
        {
          value: "B",
          text: "`SyntaxError`. You cannot add properties to a function this way.",
        },
        { value: "C", text: '`"Woof"` gets logged.' },
        { value: "D", text: "`ReferenceError`" },
      ],
      answer: "A",
      explanation:
        "This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.",
      code: "function bark() {\n  console.log('Woof!');\n}\n\nbark.animal = 'dog';\n",
    },
  ],
});
