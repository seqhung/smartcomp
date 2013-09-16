package com.tenforwardconsulting.phonegap.plugins;

import java.util.Date;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.ContentUris;
import android.content.Intent;
import android.net.Uri;
import android.provider.CalendarContract;
import android.provider.ContactsContract;



@SuppressLint("NewApi")
public class CalendarPlugin extends CordovaPlugin
{
	public static final String ACTION_ADD_TO_CALENDAR = "addToCalendar";
	public static final String ACTION_ADD_TO_CONTACT = "addToContact";
	public static final String ACTION_VIEW_CONTACT = "viewContactList";
	public static final String ACTION_VIEW_CALENDAR = "viewCalendarEvent";
	public static final Integer RESULT_CODE_CREATE = 0;
	public static final Integer PICK_CONTACT = 1;
	private CallbackContext callback;

	@Override
	public boolean execute(final String action, final JSONArray args, final CallbackContext callbackContext) throws JSONException
	{
		try
		{
			final JSONObject arg_object = args.getJSONObject(0);
			callback = callbackContext;
			if (ACTION_ADD_TO_CALENDAR.equals(action))
			{

				//ACTION_EDIT
				final Intent calIntent = new Intent(Intent.ACTION_EDIT).setType("vnd.android.cursor.item/event")
						.putExtra("beginTime", arg_object.getLong("startTimeMillis"))
						.putExtra("endTime", arg_object.getLong("endTimeMillis")).putExtra("title", arg_object.getString("title"))
						.putExtra("description", arg_object.getString("description"))
						.putExtra("eventLocation", arg_object.getString("eventLocation"));

				//this.cordova.startActivityForResult(this, intent, RESULT_CODE_CREATE);
				this.cordova.startActivityForResult(this, calIntent, RESULT_CODE_CREATE);

				return true;

			}
			else if (ACTION_VIEW_CALENDAR.equals(action))
			{

				final Date now = new Date();

				final long startMillis = now.getTime();

				final Uri.Builder builder = CalendarContract.CONTENT_URI.buildUpon();
				builder.appendPath("time");
				ContentUris.appendId(builder, startMillis);
				final Intent intent = new Intent(Intent.ACTION_VIEW).setData(builder.build());

				//this.cordova.startActivityForResult(this, intent, RESULT_CODE_CREATE);
				this.cordova.startActivityForResult(this, intent, RESULT_CODE_CREATE);

				return true;

			}
			else if (ACTION_ADD_TO_CONTACT.equals(action))
			{

				final Intent contIntent = new Intent(Intent.ACTION_INSERT, ContactsContract.Contacts.CONTENT_URI);
				contIntent.setType(ContactsContract.Contacts.CONTENT_TYPE);

				//this.cordova.startActivityForResult(this, intent, RESULT_CODE_CREATE);
				this.cordova.startActivityForResult(this, contIntent, PICK_CONTACT);

				return true;

			}
			else if (ACTION_VIEW_CONTACT.equals(action))
			{

				final Intent contIntent = new Intent(Intent.ACTION_VIEW);
				contIntent.setType(ContactsContract.Contacts.CONTENT_TYPE);

				//				final Intent intent = new Intent(Intent.ACTION_INSERT, ContactsContract.Contacts.CONTENT_URI);
				//				contIntent.setType(ContactsContract.Contacts.CONTENT_TYPE);

				//this.cordova.startActivityForResult(this, intent, RESULT_CODE_CREATE);
				this.cordova.startActivityForResult(this, contIntent, RESULT_CODE_CREATE);

				return true;

			}
		}
		catch (final Exception e)
		{
			System.err.println("Exception: " + e.getMessage());
			return false;
		}

		return false;
	}


	@Override
	public void onActivityResult(final int requestCode, final int resultCode, final Intent data)
	{
		if (requestCode == RESULT_CODE_CREATE)
		{
			if (resultCode == Activity.RESULT_OK)
			{
				callback.success();
			}
			else
			{
				callback.error("Activity result code " + resultCode);
			}
		}
	}

}
