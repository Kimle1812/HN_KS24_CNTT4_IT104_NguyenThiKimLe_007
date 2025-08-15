var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Customer = /** @class */ (function () {
    function Customer(name, email, phone) {
        this.id = Customer.autoId++;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
    Customer.prototype.getDetails = function () {
        return "KH: ".concat(this.id, " | ").concat(this.name, " | ").concat(this.email, " | ").concat(this.phone);
    };
    Customer.autoId = 1;
    return Customer;
}());
var Vehicle = /** @class */ (function () {
    function Vehicle(type, rentalPricePerDay, isAvailable) {
        this.id = Vehicle.autoId++;
        this.type = type;
        this.rentalPricePerDay = rentalPricePerDay;
        this.isAvailable = isAvailable;
    }
    Vehicle.prototype.rent = function () {
        if (this.isAvailable) {
            this.isAvailable = false;
        }
        else {
            console.log("Ph\u01B0\u01A1ng ti\u1EC7n \u0111\u00E3 \u0111\u01B0\u1EE3c ng\u01B0\u1EDDi kh\u00E1c thu\u00EA");
        }
    };
    Vehicle.prototype.returnVehicle = function () {
        if (!this.isAvailable) {
            this.isAvailable = true;
            console.log("Ph\u01B0\u01A1ng ti\u1EC7n \u0111\u00E3 \u0111\u01B0\u1EE3c tr\u1EA3 l\u1EA1i");
        }
        else {
            console.log("Ph\u01B0\u01A1ng ti\u1EC7n \u0111\u00E3 tr\u1EA3 l\u1EA1i t\u1EEB tr\u01B0\u1EDBc");
        }
    };
    Vehicle.prototype.calculateRentalCost = function (day) {
        if (day <= 0) {
            console.log("S\u1ED1 ng\u00E0y thu\u00EA kh\u00F4ng \u0111\u01B0\u1EE3c nh\u1ECF h\u01A1n 0");
            return -1;
        }
        return this.rentalPricePerDay * day;
    };
    Vehicle.autoId = 1;
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(type, rentalPricePerDay, isAvailable, feature, insurancePolicy) {
        var _this = _super.call(this, type, rentalPricePerDay, isAvailable) || this;
        _this.feature = feature;
        _this.insurancePolicy = insurancePolicy;
        return _this;
    }
    Car.prototype.getFeatures = function () {
        return this.feature;
    };
    Car.prototype.getInsurancePolicy = function () {
        return this.insurancePolicy;
    };
    return Car;
}(Vehicle));
var Motorcycle = /** @class */ (function (_super) {
    __extends(Motorcycle, _super);
    function Motorcycle(type, rentalPricePerDay, isAvailable, feature, insurancePolicy) {
        var _this = _super.call(this, type, rentalPricePerDay, isAvailable) || this;
        _this.feature = feature;
        _this.insurancePolicy = insurancePolicy;
        return _this;
    }
    Motorcycle.prototype.getFeatures = function () {
        return this.feature;
    };
    Motorcycle.prototype.getInsurancePolicy = function () {
        return this.insurancePolicy;
    };
    return Motorcycle;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(type, rentalPricePerDay, isAvailable, feature, insurancePolicy) {
        var _this = _super.call(this, type, rentalPricePerDay, isAvailable) || this;
        _this.feature = feature;
        _this.insurancePolicy = insurancePolicy;
        return _this;
    }
    Truck.prototype.getFeatures = function () {
        return this.feature;
    };
    Truck.prototype.getInsurancePolicy = function () {
        return this.insurancePolicy;
    };
    return Truck;
}(Vehicle));
var Rental = /** @class */ (function () {
    function Rental(customer, vehicle, days, totalCost) {
        this.rentalId = Rental.autoId++;
        this.customer = customer;
        this.vehicle = vehicle;
        this.days = days;
        this.totalCost = totalCost;
    }
    Rental.prototype.getDetails = function () {
        return "Rental: ".concat(this.rentalId, " | ").concat(this.customer.getDetails(), " | Xe: ").concat(this.vehicle.type, " (ID: ").concat(this.vehicle.id, ") | S\u1ED1 ng\u00E0y: ").concat(this.days, " | T\u1ED5ng ti\u1EC1n: ").concat(this.totalCost);
    };
    Rental.autoId = 1;
    return Rental;
}());
var RentalAgency = /** @class */ (function () {
    function RentalAgency() {
        this.vehicles = [];
        this.customers = [];
        this.rentals = [];
    }
    RentalAgency.prototype.addVehicle = function (vehicle) {
        this.vehicles.push(vehicle);
    };
    RentalAgency.prototype.addCustomer = function (name, email, phone) {
        this.customers.push(new Customer(name, email, phone));
    };
    RentalAgency.prototype.rentVehicle = function (customerId, vehicleId, days) {
        var customer = this.customers.find(function (c) { return c.id === customerId; });
        var vehicle = this.vehicles.find(function (v) { return v.id === vehicleId; });
        if (!customer) {
            console.log("Kh\u00F4ng t\u00ECm th\u1EA5y kh\u00E1ch h\u00E0ng");
            return null;
        }
        if (!vehicle || !vehicle.isAvailable) {
            console.log("Xe kh\u00F4ng t\u1ED3n t\u1EA1i ho\u1EB7c \u0111\u00E3 \u0111\u01B0\u1EE3c thu\u00EA");
            return null;
        }
        var totalCost = vehicle.calculateRentalCost(days);
        if (totalCost === -1)
            return null;
        vehicle.rent();
        var rental = new Rental(customer, vehicle, days, totalCost);
        this.rentals.push(rental);
        console.log("Thu\u00EA xe th\u00E0nh c\u00F4ng!");
        return rental;
    };
    RentalAgency.prototype.returnVehicle = function (vehicleId) {
        var vehicle = this.vehicles.find(function (v) { return v.id === vehicleId; });
        if (!vehicle) {
            console.log("Kh\u00F4ng t\u00ECm th\u1EA5y xe");
            return;
        }
        vehicle.returnVehicle();
    };
    RentalAgency.prototype.listAvailableVehicle = function () {
        var availableVehicles = this.vehicles.filter(function (o) { return o.isAvailable; });
        if (availableVehicles.length === 0) {
            console.log("Kh\u00F4ng t\u00ECm th\u1EA5y xe s\u1EB5n s\u00E0ng cho thu\u00EA");
            return;
        }
        availableVehicles.forEach(function (o) { return console.log(o); });
    };
    RentalAgency.prototype.listCustomerRentals = function (customerId) {
        var customer = this.customers.find(function (c) { return c.id === customerId; });
        if (!customer) {
            console.log("Kh\u00F4ng t\u00ECm th\u1EA5y kh\u00E1ch h\u00E0ng");
            return;
        }
        var list = this.rentals.filter(function (o) { return o.customer.id === customer.id; });
        if (list.length === 0) {
            console.log("Kh\u00E1ch h\u00E0ng ch\u01B0a thu\u00EA xe n\u00E0o");
            return;
        }
        list.forEach(function (o) { return console.log(o.getDetails()); });
    };
    RentalAgency.prototype.calculateTotalRevenue = function () {
        return this.rentals.reduce(function (sum, o) { return sum + o.totalCost; }, 0);
    };
    RentalAgency.prototype.getVehicleTypeCount = function () {
        var countMap = this.vehicles.reduce(function (acc, v) {
            acc[v.type] = (acc[v.type] || 0) + 1;
            return acc;
        }, {});
        console.log(countMap);
    };
    RentalAgency.prototype.getVehicleFeatures = function (vehicleId) {
        var vehicle = this.vehicles.find(function (o) { return o.id === vehicleId; });
        if (!vehicle) {
            console.log("Kh\u00F4ng t\u00ECm th\u1EA5y xe");
            return;
        }
        console.log("T\u00EDnh n\u0103ng: ".concat(vehicle.getFeatures().join(", ")));
    };
    RentalAgency.prototype.getVehicleInsurance = function (vehicleId) {
        var vehicle = this.vehicles.find(function (o) { return o.id === vehicleId; });
        if (!vehicle) {
            console.log("Kh\u00F4ng t\u00ECm th\u1EA5y xe");
            return;
        }
        console.log("Ch\u00EDnh s\u00E1ch b\u1EA3o hi\u1EC3m: ".concat(vehicle.getInsurancePolicy()));
    };
    return RentalAgency;
}());
var choice;
var retal = new RentalAgency();
retal.addCustomer("Nguyễn Thị Kim Lệ", "nguyenle@gmail.com", "6273913712");
retal.addCustomer("Nguyễn Kim Kim", "kimkim@gmail.com", "9283467832");
retal.addVehicle(new Car("BWM", 67000, true, ["Điều hòa", "GPS dẫn đường"], "Bảo hiểm toàn diện"));
retal.addVehicle(new Motorcycle("Honda", 30000, true, ["Phân phối cao", "Đường dài"], "Bảo hiểm 12 tháng"));
retal.addVehicle(new Truck("SH", 80000, true, ["Thùng hàng lớn", "Bửng nâng thủy lực"], "Bảo hiểm hàng hóa và phương tiện thương mại"));
do {
    choice = +prompt("1. Th\u00EAm kh\u00E1ch h\u00E0ng m\u1EDBi\n2. Th\u00EAm ph\u01B0\u01A1ng ti\u1EC7n m\u1EDBi (cho ch\u1ECDn lo\u1EA1i: Car, Motorcycle, Truck)\n3. Thu\u00EA xe (ch\u1ECDn kh\u00E1ch h\u00E0ng, ch\u1ECDn xe, nh\u1EADp s\u1ED1 ng\u00E0y)\n4. Tr\u1EA3 xe. 5. Hi\u1EC3n th\u1ECB danh s\u00E1ch xe c\u00F2n tr\u1ED1ng (s\u1EED d\u1EE5ng filter)\n6. Hi\u1EC3n th\u1ECB danh s\u00E1ch h\u1EE3p \u0111\u1ED3ng c\u1EE7a m\u1ED9t kh\u00E1ch h\u00E0ng (s\u1EED d\u1EE5ng filter)\n7. T\u00EDnh v\u00E0 hi\u1EC3n th\u1ECB t\u1ED5ng doanh thu (s\u1EED d\u1EE5ng reduce)\n8. \u0110\u1EBFm s\u1ED1 l\u01B0\u1EE3ng t\u1EEBng lo\u1EA1i xe (s\u1EED d\u1EE5ng reduce ho\u1EB7c map)\n9. T\u00ECm ki\u1EBFm v\u00E0 hi\u1EC3n th\u1ECB th\u00F4ng tin b\u1EB1ng m\u00E3 \u0111\u1ECBnh danh\n10. Hi\u1EC3n th\u1ECB t\u00EDnh n\u0103ng v\u00E0 ch\u00EDnh s\u00E1ch b\u1EA3o hi\u1EC3m c\u1EE7a m\u1ED9t xe (s\u1EED d\u1EE5ng find)\n11. Tho\u00E1t ch\u01B0\u01A1ng tr\u00ECnh.\nM\u1EDDi b\u1EA1n nh\u1EADp l\u1EF1a ch\u1ECDn:");
    switch (choice) {
        case 1:
            retal.addCustomer("Nguyễn Văn A", "vana@gmail.com", "123456789");
            console.log("Thêm khách hàng thành công!");
            break;
        case 2:
            retal.addVehicle(new Car("Toyota", 50000, true, ["Điều hòa", "Bluetooth"], "Bảo hiểm cơ bản"));
            console.log("Thêm xe thành công!");
            break;
        case 3:
            retal.rentVehicle(1, 1, 3);
            break;
        case 4:
            retal.returnVehicle(1);
            break;
        case 5:
            retal.listAvailableVehicle();
            break;
        case 6:
            retal.listCustomerRentals(1);
            break;
        case 7:
            console.log("T\u1ED5ng doanh thu: ".concat(retal.calculateTotalRevenue()));
            break;
        case 8:
            retal.getVehicleTypeCount();
            break;
        case 9:
            var found = retal.vehicles.find(function (v) { return v.id === 1; });
            console.log(found || "Không tìm thấy xe");
            break;
        case 10:
            retal.getVehicleFeatures(1);
            retal.getVehicleInsurance(1);
            break;
        case 11:
            console.log("Thoát chương trình");
            break;
        default:
            console.log("Lựa chọn không hợp lệ");
    }
} while (choice !== 11);
