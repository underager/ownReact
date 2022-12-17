/** @jsx TinyReact.createElement */

const root = document.getElementById('root');
// console.log('todo-app.js loaded')
var step1 = (
    <div>
        <h1 className='header'>Hello Tiny React !</h1>
        <h2>(coding nirvana)</h2>
        <div>nested 1.0 <div>nested 1.1</div></div>
        <h3> (OBSERVE: This will change)</h3>
        {2 == 1 && <div>Render this if 2==1</div>}
        {2 == 2 && <div>{2}</div>}
        <span>This is text</span>
        <button onClick={() => alert('Hi')}>Click Me!</button>
        <h3>This will be deleted</h3>
        2,3
    </div>
);

console.log(step1);

TinyReact.render(step1, root);
