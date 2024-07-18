import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const usersFilePath = path.join(process.cwd(), 'src/api/db/users.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      handleGetUsers(req, res);
      break;
    case 'POST':
      handleAddUser(req, res);
      break;
    case 'PUT':
      handleUpdateUser(req, res);
      break;
    case 'DELETE':
      handleDeleteUser(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function handleGetUsers(req: NextApiRequest, res: NextApiResponse) {
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  res.status(200).json(usersData);
}

function handleAddUser(req: NextApiRequest, res: NextApiResponse) {
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const newUser = { ...req.body, id: Date.now().toString() };
  usersData.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
  res.status(201).json(newUser);
}

function handleUpdateUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const index = usersData.findIndex((user: any) => user.id === id);
  if (index === -1) {
    res.status(404).end(`User with id ${id} not found`);
  } else {
    const updatedUser = { ...usersData[index], ...req.body };
    usersData[index] = updatedUser;
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
    res.status(200).json(updatedUser);
  }
}

function handleDeleteUser(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  const index = usersData.findIndex((user: any) => user.id === id);
  if (index === -1) {
    res.status(404).end(`User with id ${id} not found`);
  } else {
    const deletedUser = usersData.splice(index, 1)[0];
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
    res.status(200).json(deletedUser);
  }
}
