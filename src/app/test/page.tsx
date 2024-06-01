"use client";

export default function Page() {
  return (
    <div>
      <button
        onClick={() => {
          eval(`
          function sayHi() {
            console.log(name);
            console.log(age);
            var name = 'Lydia';
            let age = 21;
          }
          
          sayHi();`);
        }}
      >
        eval
      </button>
      <button className=" px-4" onClick={() => console.log("logged something")}>
        log something
      </button>
    </div>
  );
}
