import React from "react";
import { observer } from "mobx-react";

const MyFunctionComponent = observer(function (props) {
    const { store } = this.props;
    console.log('Store is =', store)
    return (
        <div>
        Total is {store.totals}
        </div>
    );
});
export default MyFunctionComponent;