import React from "react";
import { observer } from "mobx-react";

const MyFunctionComponent = observer((props) => {
    const { store, total } = this.props;
    console.log('Store is =', store)
    return (
        <div>
        Total is {total}
        </div>
    );
})
export default MyFunctionComponent;