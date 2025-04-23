
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center" dir="rtl">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">عذراً، الصفحة غير موجودة</p>
        <Link to="/" className="btn-primary">
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
