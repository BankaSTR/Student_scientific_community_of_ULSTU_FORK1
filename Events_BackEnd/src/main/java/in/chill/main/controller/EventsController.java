package in.chill.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import in.chill.main.entity.Events;
import in.chill.main.services.ClubService;
import in.chill.main.services.EventsService;
import in.chill.main.services.JudgeService;
import in.chill.main.services.VenueService;
import in.chill.main.service.CloudinaryUploadService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class EventsController {
	
	@Autowired
	private EventsService eventService;
	
	@Autowired
	private VenueService venueService;
	
	@Autowired
	private ClubService clubService;
	
	@Autowired
	private JudgeService judgeService;
	
	@Autowired
	private CloudinaryUploadService cloudinaryUploadService;

	@GetMapping("/")
	public String home() {
		return "Events Management System API is running! Available endpoints: /api/events, /api/clubs, /api/venues, /api/judges, /api/volunteers, /api/sponsors, /api/budgets, /api/departments, /api/registrations, /api/participations, /api/results, /api/feedbacks";
	}
	
	@PostMapping("/events")
	public Events addEventDetails(@RequestBody Events event) {
		return eventService.createEvent(event);
	}
	
	@GetMapping("/events")
	public List<Events> getAllEventDetails() {
		return eventService.getAllEvents();
	}
	
	@GetMapping("/events/{id}")
	public ResponseEntity<Events> getEventDetails(@PathVariable int id){
		Events event = eventService.getEventDetails(id).orElse(null);
		if(event != null) {
			return ResponseEntity.ok().body(event);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// New endpoints for frontend integration
	@GetMapping("/events/next")
	public ResponseEntity<Events> getNextEvent(){
		Events event = eventService.getNextEvent().orElse(null);
		if(event != null) {
			return ResponseEntity.ok().body(event);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping("/events/upcoming")
	public List<Events> getUpcomingEvents(){
		return eventService.getUpcomingEvents();
	}
	
	@GetMapping("/events/completed/count")
	public ResponseEntity<Integer> getCompletedEventsCount(){
		int count = eventService.getCompletedEventsCount();
		return ResponseEntity.ok(count);
	}
	
	@GetMapping("/events/{id}/fee")
	public ResponseEntity<Float> getEventFee(@PathVariable int id){
		Float fee = eventService.getEventFee(id);
		return ResponseEntity.ok(fee);
	}
	
	@PutMapping("/events/{id}")
	public ResponseEntity<Events> updateEventDetails(@PathVariable int id, @RequestBody Events event){
		Events updatedEvent = eventService.updateEventDetails(id, event);
		if(updatedEvent != null) {
			return ResponseEntity.ok(updatedEvent);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// Keep backward compatibility with old endpoints
	@PostMapping("/Event")
	public Events addEventDetailsLegacy(@RequestBody Events event) {
		return eventService.createEvent(event);
	}
	
	@GetMapping("/Event")
	public List<Events> getAllEventDetailsLegacy() {
		return eventService.getAllEvents();
	}
	
	@GetMapping("/Event/{id}")
	public ResponseEntity<Events> getEventDetailsLegacy(@PathVariable int id){
		Events event = eventService.getEventDetails(id).orElse(null);
		if(event != null) {
			return ResponseEntity.ok().body(event);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@PutMapping("/Event/{id}")
	public ResponseEntity<Events> updateEventDetailsLegacy(@PathVariable int id, @RequestBody Events event){
		Events updatedEvent = eventService.updateEventDetails(id, event);
		if(updatedEvent != null) {
			return ResponseEntity.ok(updatedEvent);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	// DELETE endpoint for events
	@DeleteMapping("/events/{id}")
	public ResponseEntity<?> deleteEvent(@PathVariable int id){
		System.out.println("DELETE request received for event ID: " + id);
		try {
			eventService.deleteEvent(id);
			System.out.println("Event deleted successfully: " + id);
			return ResponseEntity.ok().body("Event deleted successfully");
		} catch (Exception e) {
			System.err.println("Error deleting event " + id + ": " + e.getMessage());
			e.printStackTrace();
			return ResponseEntity.notFound().build();
		}
	}
	
	// Legacy DELETE endpoint for backward compatibility
	@DeleteMapping("/Event/{id}")
	public ResponseEntity<?> deleteEventLegacy(@PathVariable int id){
		try {
			eventService.deleteEvent(id);
			return ResponseEntity.ok().body("Event deleted successfully");
		} catch (Exception e) {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping(value = "/events/upload-photo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> uploadEventPhoto(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Файл не выбран");
		}
		try {
			String url = cloudinaryUploadService.uploadFile(file);
			Map<String, String> response = new HashMap<>();
			response.put("url", url);
			return ResponseEntity.ok(response);
		} catch (IOException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка загрузки файла: " + e.getMessage());
		}
	}
}
