import React from "react";
import { observer } from "mobx-react";

const MyFunctionComponent = observer(function (props) {
    const { store } = this.props;
    return (
        <div>
        Total is {store.totals}
        </div>
    );
});
export default MyFunctionComponent;