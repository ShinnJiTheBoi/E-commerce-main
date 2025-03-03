package com.aryan.ecom.services.admin.coupon;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.aryan.ecom.dto.CouponDto;
import com.aryan.ecom.exceptions.ValidationException;
import com.aryan.ecom.model.Category;
import com.aryan.ecom.model.Coupon;
import com.aryan.ecom.repository.CategoryRepository;
import com.aryan.ecom.repository.CouponRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminCouponServiceImpl implements AdminCouponService {
	private final CouponRepository couponRepository;
	private final CategoryRepository categoryRepository;


	public Coupon createCoupon(CouponDto coupon) {
		if(couponRepository.existsByCode(coupon.getCode())) {
			throw new ValidationException("Coupon code already exists");
		} else {
			log.info("New Coupon Code Added: {}", coupon.getCode());
			log.info("New Coupon ID" + coupon.getCategoryId());
			Category category = categoryRepository.findById(coupon.getCategoryId()).orElseThrow();
		
			Coupon newCoupon = new Coupon();
			newCoupon.setCategory(category);
			newCoupon.setCode(coupon.getCode());
			newCoupon.setDiscount(coupon.getDiscount());
			newCoupon.setExpirationDate(coupon.getExpirationDate());
			newCoupon.setName(coupon.getName());
			return couponRepository.save(newCoupon);
		}
	}

	public List<Coupon> getAllCoupon() {
		log.info("Fetching all coupons.");
		return couponRepository.findAll();
	}

	
	
}
