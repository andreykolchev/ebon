package com.restfully.webapp.DAO;

/**
 *
 * @author 2015 Andrey Kolchev mailto: andreykolchev@gmail.com
 */
import com.restfully.webapp.model.Model;
import java.util.ArrayList;
import java.util.List;
import java.sql.*;
import java.util.logging.Logger;

public class ModelDAO {

    private Connection connection = null;
    private Statement statement = null;
    private ResultSet resultSet = null;
    private static final Logger log = Logger.getLogger(ModelDAO.class.getName());

    public List<Model> find(int model_id, int language_id, int currency_id) throws SQLException {
        List<Model> modelList = new ArrayList<Model>();
        String TextQuery;
        int currencyid = 1;
        try {
            TextQuery = "";
            if (model_id != 0) {
                TextQuery = MySQL.addLine(TextQuery);
                TextQuery = TextQuery + "rentalcars.model.model_id = " + Integer.toString(model_id);
            }
            if (language_id != 0) {
                TextQuery = MySQL.addLine(TextQuery);
                TextQuery = TextQuery + "rentalcars.model.language_id = " + Integer.toString(language_id);
            }
            if (currency_id != 0) {
                    currencyid = currency_id;
                }
            TextQuery = TextQuery + ";";
            String selectSQL = "SELECT "
                    + "rentalcars.model.*, "
                    + "rentalcars.model_prices.price_day/rentalcars.currency_exchange.course*rentalcars.currency_exchange.multiplicity AS price_day, "
                    + "rentalcars.model_prices.price_week/rentalcars.currency_exchange.course*rentalcars.currency_exchange.multiplicity AS price_week, "
                    + "rentalcars.model_prices.price_month/rentalcars.currency_exchange.course*rentalcars.currency_exchange.multiplicity AS price_month "
                    + "FROM rentalcars.model "
                    + "LEFT JOIN rentalcars.model_prices ON (rentalcars.model.model_id = rentalcars.model_prices.model_id) "
                    + "LEFT JOIN rentalcars.currency_exchange ON (rentalcars.model_prices.currency_id = rentalcars.currency_exchange.currency_id) " + TextQuery;
            connection = MySQL.getConnection();
            statement = connection.createStatement();
            resultSet = statement.executeQuery(selectSQL);
            while (resultSet.next()) {
                int modelid = 0;
                int languageid = 0;
                if (model_id == 0) {
                    modelid = resultSet.getInt("model_id");
                }
                if (language_id == 0) {
                    languageid = resultSet.getInt("language_id");
                }
                String name = resultSet.getString("name");
                String description = resultSet.getString("description");
                String img_path = resultSet.getString("img_path");
                String class_auto = resultSet.getString("class_auto");
                String passengers = resultSet.getString("passengers");
                String winter = resultSet.getString("winter");
                String doors = resultSet.getString("doors");
                String transmission = resultSet.getString("transmission");
                int price_day = resultSet.getInt("price_day");
                int price_week = resultSet.getInt("price_week");
                int price_month = resultSet.getInt("price_month");
                Model model = new Model(modelid, languageid, name, description, img_path, class_auto, passengers, winter, doors, transmission, price_day, price_week, price_month);
                modelList.add(model);
            }
            return modelList;
        } catch (SQLException ex) {
            log.info(ex.getMessage());
        } finally {
            MySQL.closeConnection(connection, statement);
        }
        return null;
    }

}
