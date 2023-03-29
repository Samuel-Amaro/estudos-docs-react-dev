/**
 * * EDITOR DE PERFIL
 */

import { useState } from "react";

export default function EditProfile() {
  const [profile, setProfile] = useState({
    firstName: "Jane",
    lastName: "Jacobs",
  });
  const [isEditing, setIsEditing] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
      }}
    >
      <label htmlFor="first-name">
        First name:{" "}
        {isEditing ? (
          <input
            id="first-name"
            type="text"
            name="firstName"
            onChange={(e) => {
              setProfile({
                ...profile,
                firstName: e.target.value,
              });
            }}
            value={profile.firstName}
          />
        ) : (
          <b>{profile.firstName}</b>
        )}
      </label>
      <br />
      <label htmlFor="last-name">
        Last name:{" "}
        {isEditing ? (
          <input
            id="last-name"
            type="text"
            name="lastName"
            onChange={(e) => {
              setProfile({
                ...profile,
                lastName: e.target.value,
              });
            }}
            value={profile.lastName}
          />
        ) : (
          <b>{profile.lastName}</b>
        )}
      </label>
      <br />
      <button type="submit">{isEditing ? "Save" : "Edit"}</button>
      <p>
        <i>Hello, {`${profile.firstName} ${profile.lastName}`}</i>
      </p>
    </form>
  );
}
