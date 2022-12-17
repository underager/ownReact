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
            updateDomElement(newDomElement, vdom)
        }

        newDomElement._virtualElement = vdom;

        if(nextSibling){
            container.insertBefore(newDomElement, nextSibling);
        }else{
            container.appendChild(newDomElement)
        }

        vdom.children.forEach(child => mountElement(child, newDomElement));
    }

    function updateDomElement(domElement, newVirtualElement, oldVirtualElement = {}){
        const oldProps = oldVirtualElement.props || {};
        const newProps = newVirtualElement.props || {};

        Object.keys(newProps).forEach(propName =>{
            const oldProp = oldProps[propName];
            const newProp = newProps[propName];

            if(oldProp !== newProp){
                if(propName.slice(0,2) === 'on'){
                    //prop is an event handler
                    const eventName = propName.toLowerCase().slice(2);
                    domElement.addEventListener(eventName, newProp, false);

                    if(oldProp){
                        domElement.removeEventListener(eventName, oldProp, false);
                    }
                }else if(propName === 'value' || propName === 'checked'){
                    // this is a set of special values that cannot be set using the setAttribute()
                    domElement[propName] = newProp;
                }else if(propName !== 'children'){
                    if(propName === 'className'){
                        domElement.setAttribute('class', newProps[propName]);
                    }else {
                        domElement.setAttribute(propName, newProps[propName]);
                    }
                }
            }
        });

        //remove OldProps
        Object.keys(oldProps).forEach(propName =>{
            const newProp = newProps[propName];
            const oldProp = newProps[propName];

            if(!newProp){
                if(propName.slice(0,2) === 'on'){
                    domElement.removeEventListener(propName.toLowerCase().slice(2), oldProp, false);
                }else if(propName !== 'children'){
                    domElement.removeAttribute(propName)
                }
            }
        })
    }

    return {
        createElement,
        render
    }
}());