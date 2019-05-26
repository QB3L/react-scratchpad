import React from "react";
import { observer } from "mobx-react";
import store from './store'

const c = class MyClassComponent extends React.Component {
    render() {
        return (
            <div>
            Total is {store.getTotals}
            </div>
        );
    }
}
observer(c)
export default c;