const users = [
  {
    fullName: 'Administrator',
    email: 'admin@admin.com',
    username: 'admin',
    password: 'admin1234',
    verified: true,
  },
];

db.users.insert(users);
