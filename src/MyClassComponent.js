import React from "react";
import { observer } from "mobx-react";
import store from './store'

const theClass = class MyClassComponent extends React.Component {
    render() {
        console.log('Store is =', store)
        console.log('Props is =', this.props)
        return (
            <div>
            Total is {store.getTotals}
            </div>
        );
    }
}

observer(theClass)
export default theClass;