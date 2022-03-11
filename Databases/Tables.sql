create TABLE users (id VarChar(200) PRIMARY KEY,
					username VarChar(100),
					full_name VarChar(200),
					phone_number Varchar(13),
					email VarChar(300),
					password VarChar(15),
					isAdmin INT DEFAULT 0,
					isDeleted INT DEFAULT 0,
					isSent INT DEFAULT 0);

CREATE TABLE parcel(id VarChar(200),
					description VarChar(500),
					sender_number VarChar(13),
					receiver_number VarChar(13),
					start_location VarChar(100),
					end_location VarChar(100),
					isDeleted INT DEFAULT 0,
					isUpdated INT DEFAULT 0,
					isSent INT DEFAULT 0,
					isDelivered INT DEFAULT 0,
					current_location VarChar(100),
					sender_id Varchar(100) FOREIGN KEY(id) REFERENCES users);