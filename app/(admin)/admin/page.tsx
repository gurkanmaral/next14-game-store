
import { admin } from "@/actions/admin";
import FormSuccess from "@/components/auth/FormSuccess";
import RoleGate from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import AdminHome from "./_components/AdminHome";


const AdminPage = () => {
  return (
            <RoleGate allowedRole={UserRole.ADMIN}>
              <AdminHome />        
            </RoleGate>

  )
}

export default AdminPage