import React from "react";
import { useParams } from "react-router-dom";
import Privacy from "../privacy/privacy";
import { useNavigate } from "react-router-dom";
import Terms from "../terms/terms";
export default function ProfileMenu() {
  const navigate = useNavigate();
  const param = useParams();
  return param.id === "privacy" ? (
    <Privacy privacy={true} toggle={() => navigate("/profile")} />
  ) : param.id === "terms" ? (
    <Terms terms={true} toggle={() => navigate("/profile")} />
  ) : (
    ""
  );
}
