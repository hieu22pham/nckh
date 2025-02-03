const ModelList = require("../../models/modellist.model"); // Đảm bảo model được định nghĩa đúng

const getProcTime = async (req, res) => {
    const query = req.query.query;
    const nameMatch = query.match(/name='(.+?)'/); // Trích xuất tên máy từ query
    if (nameMatch) {
      const machineName = nameMatch[1];
      
      // Giả sử dữ liệu ProcTime được lưu trong mảng modelList
      const modelList = await ModelList.findAll({
        attributes: ['Name', 'ProcTime'], // Lựa chọn chỉ những trường cần thiết
      });
      const machine = modelList.find((m) => m.Name === machineName);
      if (machine) {
        res.json(machine.ProcTime); // Gửi ProcTime về simulation
      } else {
        res.status(404).json({ error: 'Machine not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid query' });
    }
};

const updateProcTime = async (req, res) => {
  const { machineName, newProcTime } = req.body; // Lấy dữ liệu từ body

  console.log(machineName)
  if (!machineName || !newProcTime) {
      return res.status(400).json({ error: 'Machine name or new ProcTime is missing' });
  }

  try {
      // Tìm kiếm máy trong database
      const machine = await ModelList.findOne({
          where: { Name: machineName },
      });

      if (machine) {
          // Cập nhật ProcTime
          machine.ProcTime = newProcTime;
          await machine.save(); // Lưu thay đổi vào database
          res.json({ message: 'ProcTime updated successfully', machine });
      } else {
          res.status(404).json({ error: 'Machine not found' });
      }
  } catch (error) {
      console.error('Error updating ProcTime:', error);
      res.status(500).json({ error: 'An error occurred while updating ProcTime' });
  }
};

const getAllData = async (req, res) => {
  try {
      const data = await ModelList.findAll({
          attributes: ['Name', 'NameVNM', 'ProcTime'], // Chỉ lấy các trường cần thiết
      });
      res.json(data); // Trả về dữ liệu dạng JSON
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

module.exports = { getProcTime, updateProcTime, getAllData };
