exports.getMfHoldings = async (req, res, next) => {
    try {
      const { pan } = req.query;
  
      if (!pan) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a PAN number'
        });
      }
  
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(pan)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid PAN number'
        });
      }
  
      const mockResponse = {
        pan: pan,
        holdings: [
          {
            fund_name: "Axis Bluechip Fund",
            category: "Equity - Large Cap",
            current_value: 150000,
            units: 120.5,
            nav: 1245.80
          },
          {
            fund_name: "HDFC Short Term Debt Fund",
            category: "Debt - Short Duration",
            current_value: 50000,
            units: 300.75,
            nav: 166.20
          },
          {
            fund_name: "Mirae Asset Emerging Bluechip",
            category: "Equity - Mid Cap",
            current_value: 200000,
            units: 250.25,
            nav: 799.30
          }
        ],
        total_value: 400000,
        last_updated: new Date().toISOString()
      };
  
      res.status(200).json({
        success: true,
        data: mockResponse
      });
    } catch (err) {
      next(err);
    }
  };