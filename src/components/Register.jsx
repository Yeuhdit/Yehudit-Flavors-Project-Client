// react-client/src/components/Register.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import userService from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import "./AuthStyles.css";

const registerSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "איך קוראים לך? (חובה להזין שם)",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.empty": "אימייל חובה",
    "string.email": "כתובת אימייל לא תקינה",
  }),
  // ביטלנו את ה-Regex! דורשים רק מינימום 6 תווים
  password: Joi.string().min(6).required().messages({
    "string.empty": "סיסמה חובה",
    "string.min": "הסיסמה חייבת להכיל לפחות 6 תווים",
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    "any.only": "הסיסמאות לא תואמות",
    "any.required": "חובה לאמת סיסמה",
  }),
  address: Joi.string().allow("").optional(),
});

const Register = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMsg("");

    try {
      setLoading(true);
      const resData = await userService.register({
        username: data.username.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        address: data.address?.trim() || "",
      });

      if (resData?.user) {
        loginContext(resData.user);
      }

      setSuccessMsg("איזה כיף שהצטרפת! מעביר אותך פנימה...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      if (err?.response?.status === 409) {
        setServerError("האימייל הזה כבר רשום במערכת, נסי להתחבר.");
      } else {
        setServerError("אירעה שגיאה בהרשמה. נסי שוב מאוחר יותר.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          
          <div className="auth-header">
            <h1 className="auth-title">יצירת <span className="auth-highlight">חשבון.</span></h1>
            <p className="auth-subtitle">הצטרפי לקהילת הטעמים שלנו</p>
          </div>

          {serverError && <div className="auth-alert error">{serverError}</div>}
          {successMsg && <div className="auth-alert success">{successMsg}</div>}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <div className="input-group">
              <input 
                type="text" 
                placeholder="שם משתמש *" 
                {...register("username")}
                className={`auth-input ${errors.username ? "has-error" : ""}`} 
              />
              <PersonRoundedIcon className="input-icon" />
              {errors.username && <span className="error-text">{errors.username.message}</span>}
            </div>

            <div className="input-group">
              <input 
                type="email" 
                placeholder="כתובת אימייל *" 
                {...register("email")}
                className={`auth-input ${errors.email ? "has-error" : ""}`} 
              />
              <EmailRoundedIcon className="input-icon" />
              {errors.email && <span className="error-text">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <input 
                type="password" 
                placeholder="סיסמה (6 תווים לפחות) *" 
                {...register("password")}
                className={`auth-input ${errors.password ? "has-error" : ""}`} 
              />
              <LockRoundedIcon className="input-icon" />
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>

            <div className="input-group">
              <input 
                type="password" 
                placeholder="אימות סיסמה *" 
                {...register("confirmPassword")}
                className={`auth-input ${errors.confirmPassword ? "has-error" : ""}`} 
              />
              <VpnKeyRoundedIcon className="input-icon" />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
            </div>

            <div className="input-group">
              <input 
                type="text" 
                placeholder="כתובת (אופציונלי)" 
                {...register("address")}
                className="auth-input" 
              />
              <HomeRoundedIcon className="input-icon" />
            </div>
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "יוצר חשבון..." : "הצטרפות עכשיו"}
            </button>

          </form>

          <div className="auth-footer-link">
            כבר רשומה? <span onClick={() => navigate("/login")}>התחברי כאן</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;