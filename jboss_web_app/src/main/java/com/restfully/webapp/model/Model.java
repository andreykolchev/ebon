package com.restfully.webapp.model;

/**
 *
 * @author 2015 Andrey Kolchev mailto: andreykolchev@gmail.com
 */
public class Model {

    public int id;
    public int language_id;
    public String name;
    public String description;
    public String img_path;
    public String class_auto;
    public String passengers;
    public String winter;
    public String doors;
    public String transmission;
    public int price_day;
    public int price_week;
    public int price_month;

    public Model(int id, int language_id, String name, String description, String img_path, String class_auto, String passengers, String winter, String doors, String transmission, int price_day, int price_week, int price_month) {
        this.id = id;
        this.language_id = language_id;
        this.name = name;
        this.description = description;
        this.img_path = img_path;
        this.class_auto = class_auto;
        this.passengers = passengers;
        this.winter = winter;
        this.doors = doors;
        this.transmission = transmission;
        this.price_day = price_day;
        this.price_week = price_week;
        this.price_month = price_month;
    }

    public String toJsonString() {
        String JsonString;
        JsonString = "";
        if (id != 0)
        {JsonString = JsonString + "\"id\":" + id;}
        if (language_id != 0)
            {if (!(JsonString.equals("")))
            {JsonString = JsonString + ",";}
            JsonString = JsonString + "\"language_id\":" + language_id;}
        if (!(JsonString.equals("")))
            {JsonString = JsonString + ",";}
        JsonString = JsonString + "\"name\":\"" + name + "\""
                + ",\"description\":\"" + description + "\""
                + ",\"img_path\":\"" + img_path + "\""
                + ",\"class_auto\":\"" + class_auto + "\""
                + ",\"passengers\":\"" + passengers + "\""
                + ",\"winter\":\"" + winter + "\""
                + ",\"doors\":\"" + doors + "\""
                + ",\"transmission\":\"" + transmission + "\""
                + ",\"price_day\":" + price_day
                + ",\"price_week\":" + price_week
                + ",\"price_month\":" + price_month;
        return ("{" + JsonString + "}");
    }
}
