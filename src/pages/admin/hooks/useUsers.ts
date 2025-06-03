import { useState, useEffect } from 'react';
import prisma from '../../../lib/prisma';
import { User } from '@prisma/client';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await prisma.user.findMany({
        orderBy: {
          joinedAt: 'desc'
        }
      });
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const toggleFreeAccess = async (userId: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) throw new Error('User not found');

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          freeAccess: !user.freeAccess
        }
      });
      
      setUsers(users.map(u => u.id === userId ? updatedUser : u));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    }
  };

  return { users, loading, error, toggleFreeAccess };
}