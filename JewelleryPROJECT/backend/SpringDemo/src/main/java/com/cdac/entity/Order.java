package com.cdac.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_shopping_order")
public class Order {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
		
		private LocalDate date;
		private double totalAmount;
		private Status status;
		
		public static enum Status {
			CONFIRMED, PAYMENT_PENDING, CANCELLED;
		}
		
		//@JsonIgnore
		@ManyToOne
		@JoinColumn(name = "userId")
		private User user;
		
		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public LocalDate getDate() {
			return date;
		}

		public void setDate(LocalDate date) {
			this.date = date;
		}

		public double getTotalAmount() {
			return totalAmount;
		}
		public void setTotalAmount(double totalAmount) {
			this.totalAmount = totalAmount;
		}

		public Status getStatus() {
			return status;
		}

		public void setStatus(Status status) {
			this.status = status;
		}

		public User getUser() {
			return user;
		}

		public void setCustomer(User user) {
			this.user = user;
	}
}
