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
          attributes: ['Name', 'NameVNM', 'ProcTime', 'NumberProcessed'], // Chỉ lấy các trường cần thiết
      });
      res.json(data); // Trả về dữ liệu dạng JSON
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

const updateNumberProcessed = async (req, res) => {
  const { machineName } = req.query; // Lấy tên máy từ query

  if (!machineName) {
      return res.status(400).json({ error: 'Machine name is required' });
  }

  try {
      // Tìm kiếm máy trong cơ sở dữ liệu theo tên
      const machine = await ModelList.findOne({
          where: { Name: machineName },
      });

      if (machine) {
          // Cập nhật NumberProcessed
          machine.NumberProcessed += 1; // Tăng giá trị NumberProcessed lên 1
          await machine.save(); // Lưu thay đổi vào cơ sở dữ liệu

          res.json({ message: `NumberProcessed for ${machineName} updated successfully`, machine });
      } else {
          res.status(404).json({ error: 'Machine not found' });
      }
  } catch (error) {
      console.error('Error updating NumberProcessed:', error);
      res.status(500).json({ error: 'An error occurred while updating NumberProcessed' });
  }
};


const resetNumberProcessed = async (req, res) => {
    try {
        await ModelList.update({ NumberProcessed: 0 }, { where: {} }); // Cập nhật tất cả máy về 0
        res.json({ message: "All NumberProcessed values have been reset to 0" });
    } catch (error) {
        console.error("Error resetting NumberProcessed:", error);
        res.status(500).json({ error: "An error occurred while resetting NumberProcessed" });
    }
};

module.exports = { getProcTime, updateProcTime, getAllData, updateNumberProcessed, resetNumberProcessed };
