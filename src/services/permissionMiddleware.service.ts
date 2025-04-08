const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const permissionMiddleware = (requiredPermission: any) => {
  return async (req: any, res: any, next: any) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { role: { include: { permissions: true } } },
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const hasPermission = user.role.permissions.some(
      (perm: any) => perm.name === requiredPermission
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Acceso denegado" });
    }

    next();
  };
};