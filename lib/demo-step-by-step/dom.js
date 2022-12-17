// Create element stub

console.log('dom.js loaded');
const TinyReact = (function() {
    function createElement(type, attributes = {}, ...children){

       const childElements = [].concat(...children).reduce(
        (acc, child)=>{
            if(child != null && child != true && child != false){
                if(child instanceof Object){
                    acc.push(child);
                }else{
                    acc.push(createElement('text', {textContent: child}))
                }
            }
            return acc;
        }, []
       )
        return{
            type,
            children: childElements,
            props: Object.assign({children: childElements}, attributes)
        }
    }

    const render = function(vdom, container, oldDomElement = container.firstChild){
        if(!oldDomElement){
            mountElement(vdom, container, oldDomElement);
        }
    }

    const mountElement = function(vdom, container, oldDomElement){
        mountSimpleNode(vdom, container, oldDomElement);
    }

    const mountSimpleNode = function(vdom, container, oldDomElement, parentComponent){
        const nextSibling = oldDomElement && oldDomElement.nextSibling;
        let newDomElement = null;

        if(vdom.type == 'text'){
            newDomElement = document.createTextNode(vdom.props.textContent);
        }else{
            newDomElement = document.createElement(vdom.type);
        }

        newDomElement._virtualElement = vdom;

        if(nextSibling){
            container.insertBefore(newDomElement, nextSibling);
        }else{
            container.appendChild(newDomElement)
        }

        vdom.children.forEach(child => mountElement(child, newDomElement));
    }

    return {
        createElement,
        render
    }
}());