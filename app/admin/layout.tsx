import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: 'E-shop Admin',
    description: 'E-shop Admin Dashboard'
}

const Admin = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <div><AdminNav/></div>
            {children}
        </div>
    );
}
 
export default Admin;