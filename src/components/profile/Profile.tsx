import React, { useRef } from "react";
import styles from "./Profile.module.css";
import ContentEditable from "react-contenteditable";

export function Profile() {
    // content editable: set a place holder as initial value
    const initialValue = "Add your name here";
    // pass it to as param to useref()
    const name = useRef(initialValue);
    // set a function to handle the changes and replace for the current value/name
    const handleChange = (event) => {
        name.current = event.target.value;
    };
    return (
        <div className={styles.profile__container}>
            {/* ContendEditable: React component for a div with editable contents

 */}
            <ContentEditable
                html={name.current}
                onChange={handleChange}
                disabled={false}
                className={styles.userName}
            />
        </div>
    );
}
