const Client = require('../models/Client');

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { firstName, lastName, middleName, passportNumber, passportSeries, passportIssueDate } = req.body;

    if (!firstName || !lastName || !middleName || !passportNumber || !passportSeries || !passportIssueDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingClient = await Client.findOne({ firstName, lastName, middleName, passportNumber, passportSeries, passportIssueDate });
      if (existingClient) {
        return res.status(409).json({ message: 'Client already exists' });
    }

    const newClient = new Client({
      firstName,
      lastName,
      middleName,
      passportNumber,
      passportSeries,
      passportIssueDate
    });

    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const updateData = req.body;

    if (!updateData.firstName || !updateData.lastName || !updateData.middleName || !updateData.passportNumber || !updateData.passportSeries || !updateData.passportIssueDate) {
      return res.status(400).json({ message: 'No update data provided' });
    }

    const updatedClient = await Client.findByIdAndUpdate(clientId, updateData, { new: true });

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(updatedClient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const deletedClient = await Client.findByIdAndDelete(clientId);

    if (!deletedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};